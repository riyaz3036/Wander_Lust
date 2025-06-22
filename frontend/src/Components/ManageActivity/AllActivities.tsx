import { useEffect, useState } from "react";
import { Activity } from "../../types/activity.types";
import ActivityService from "../../service/activity.service";
import { message, Pagination } from "antd";
import ColorConstants from "../../constants/ColorConstants";
import LoadingOverlay from "../common/LoadingOverlay/LoadingOverlay";
import ManageActivityCard from "./ManageActCard/ManageActivityCard";

interface AllActivitiesProps {
    setToEditActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
    setToDeleteActivity: React.Dispatch<React.SetStateAction<string>>;
    pagination: {page: number, size: number, total: number};
    setPagination: React.Dispatch<React.SetStateAction<{page: number, size: number, total: number}>>;
    activities: Activity[];
    loading: boolean;
}

const AllActivities: React.FC<AllActivitiesProps> = ({setToEditActivity, setToDeleteActivity, pagination, setPagination, activities, loading}) => {
   
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
                <p className="text-2xl font-semibold">All Activities</p>
            </div>

            <div className="add_tour_cards">
                {loading && (<LoadingOverlay />)}
                {!loading && activities.length === 0 && (
                    <p className="text-center p-5 add_tour_error">No Activities</p>
                )}
                {!loading &&
                    activities.map((activity) => (
                    <ManageActivityCard activity={activity} setToEditActivity={setToEditActivity} setToDeleteActivity={setToDeleteActivity}/>
                ))}
            </div>
            { !loading && activities.length > 0 && (
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

export default AllActivities;