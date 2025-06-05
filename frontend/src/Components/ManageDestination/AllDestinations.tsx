import { useEffect, useState } from "react";
import { Destination } from "../../types/destination.types";
import { message, Pagination } from "antd";
import DestinationService from "../../service/destination.service";
import LoadingOverlay from "../common/LoadingOverlay/LoadingOverlay";
import ColorConstants from "../../constants/ColorConstants";
import ManageDestCard from "./ManageDestCard/ManageDestCard";

interface AllDestinationsProps {
    setToEditDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
    setToDeleteDestination: React.Dispatch<React.SetStateAction<string>>;
    pagination: {page: number, size: number, total: number};
    setPagination: React.Dispatch<React.SetStateAction<{page: number, size: number, total: number}>>;
    destinations: Destination[];
    loading: boolean;
}


const AllDestinations: React.FC<AllDestinationsProps> = ({setToEditDestination, setToDeleteDestination, pagination, setPagination, destinations, loading}) => {
    
    const handleTableChange = (page: number, size: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: page,
            size: size 
        }));
    };


    return (
        <div className="p-[20px] flex flex-col gap-[10px]" style={{backgroundColor: ColorConstants.white }}>
            <div className="flex justify-between items-center add_tour_list_title_section">
                <p className="text-2xl font-semibold">All Destinations</p>
            </div>

            <div className="add_tour_cards">
                {loading && (<LoadingOverlay />)}
                {!loading && destinations.length === 0 && (
                    <p className="text-center p-5 add_tour_error">No Destinations</p>
                )}
                {!loading &&
                    destinations.map((destination) => (
                    <ManageDestCard destination={destination} setToEditDestination={setToEditDestination} setToDeleteDestination={setToDeleteDestination}/>
                ))}
            </div>

            { !loading && destinations.length > 0 && (
                <div className="flex justify-center mt-[20px]">
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
        </div>
    )
}

export default AllDestinations;