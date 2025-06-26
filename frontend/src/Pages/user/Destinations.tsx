import { message, Pagination } from "antd";
import { useEffect, useState } from "react";
import PageLoader from "../../Components/common/FullPageLoader/PageLoader";
import DestinationList from "../../Components/Home/DestinationList/DestinationList";
import DestinationService from "../../service/destination.service";
import { Destination } from "../../types/destination.types";


const Destinations = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});
    const [destinationError, setDestinationError] = useState<string>('');


     // fetch the tours
    const fetchDestinations = (page: number, size: number) => {
        setLoading(true);
        DestinationService.fetchDestinationsWithPagination(page, size)
            .then((response) => {
                setDestinations(response?.data);
                setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching Destinations.', error);
                message.error(error.message || 'Error while fetching Destinations.');
                setDestinationError(error.message || 'Error while fetching Destinations.');
            })
            .finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        fetchDestinations(1, 10);
    }, []);


    useEffect(() => {
       fetchDestinations(pagination.page, pagination.size);
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
                    <h2 className="">Destinations</h2>
                    {destinationError.length !== 0 && <p className="text-center p-5 add_tour_error">{destinationError}</p>}
                </div>
                <DestinationList destinations={destinations} />
            </div>

            {destinations.length > 0 && (
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
            
            {loading && (<PageLoader />)}
        </div>
    )
}

export default Destinations;