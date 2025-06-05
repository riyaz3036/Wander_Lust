import { message, Pagination } from "antd";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/common/LoadingOverlay/LoadingOverlay";
import TourList from "../../components/Home/TourList/TourList";
import TourService from "../../service/tour.service";
import { Tour } from "../../types/tour.types";
import Filter, { FilterOptionProps } from "../../components/common/Filter/Filter";
import DestinationService from "../../service/destination.service";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import RouteConstants from "../../constants/RouteConstants";

const Tours = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});
    const [tourError, setTourError] = useState<string>('');
    const [filterOptions, setFilterOptions] = useState<FilterOptionProps[]>([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const navigate = useNavigate();
    const destId = queryParams.get('destId');
    const [request, setRequest] = useState<Record<string, string[]>>(
        destId ? { dest_id: [destId] } : {}
    );

    // fetch the tours
    const fetchTours = (page: number, size: number, payload?: Record<string, string[]>) => {
        if(destId && (!payload || !payload['dest_id'] || payload['dest_id'].length > 0 || !payload['dest_id'].includes(destId))) navigate(RouteConstants.allTours)
        setLoading(true);
        if(payload){
            DestinationService.fetchToursByDestinationIds(page, size, payload)
                .then((response) => {
                    setTours(response?.data);
                    setPagination({page: response.page, size: pagination.size, total: response.totalElements});
                })
                .catch((error) => {
                    console.error('Error while fetching Tours.', error);
                    message.error(error.message || 'Error while fetching Tours.');
                    setTourError(error.message || 'Error while fetching Tours.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        else {
            TourService.fetchTourWithPagination(page, size)
                .then((response) => {
                    setTours(response?.data);
                    setPagination({page: response.page, size: pagination.size, total: response.totalElements});
                })
                .catch((error) => {
                    console.error('Error while fetching Tours.', error);
                    message.error(error.message || 'Error while fetching Tours.');
                    setTourError(error.message || 'Error while fetching Tours.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    const fetchDestinationOptions = () => {
        DestinationService.fetchDestinations()
            .then((response) => {
                setFilterOptions([{ field: "dest_id", displayText: "Destinations", options: response?.data.map(dest => {return {label: dest.title, value: dest.id}})}]);
            })
            .catch((error) => {
                console.error('Error while fetching Destination options.', error);
                message.error(error.message || 'Error while fetching Destination option.');
                setTourError(error.message || 'Error while fetching Destination option.');
            })
    }


    useEffect(() => {
        fetchTours(1, 10, request);
        fetchDestinationOptions();
    }, []);

    useEffect(() => {
        fetchTours(1, 10, request);
    }, [request]);


    useEffect(() => {
       fetchTours(pagination.page, pagination.size, request);
    }, [pagination.page, pagination.size]);

    const handleTableChange = (page: number, size: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: page,
            size: size 
        }));
    };

    return (
         <div className="p-[20px] lg:p-[30px]">
            <div>
                <div className="my-[20px]">
                    <h2 className="m-0">Tours</h2>
                </div>
                <div className="mb-[20px]">
                    <Filter request={request} setRequest={setRequest} filterOptions={filterOptions} />
                </div>
                <TourList tours={tours} />
            </div>

            {tourError.length !== 0 && <p className="text-center p-5 add_tour_error">{tourError}</p>}

            {tours.length > 0 && (
                <div className="flex justify-center my-[60px]">
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.size}
                        total={pagination.total}
                        showSizeChanger
                        pageSizeOptions={['5', '10']}
                        onChange={handleTableChange}
                    />
                </div>
            )}

            {loading && (<LoadingOverlay />)}
        </div>
    )
}

export default Tours;