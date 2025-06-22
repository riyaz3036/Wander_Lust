import { useEffect, useState } from "react";
import { Activity, AddActivityRequest } from "../../types/activity.types";
import ActivityService from "../../service/activity.service";
import { message, Typography } from "antd";
import ColorConstants from "../../constants/ColorConstants";
import ManageFormInput from "../common/ManageFormInput/ManageFormInput";
import ActivityBackground from '../../assets/images/activity-background.jpg'
import LoadingOverlay from "../common/LoadingOverlay/LoadingOverlay";

interface AddEditActivityProps {
    isAdd: boolean;
    setToEditActivity?: React.Dispatch<React.SetStateAction<Activity | null>>;
    activity?: Activity;
    setActiveTabKey?:  React.Dispatch<React.SetStateAction<string>>
    fetchActivities: (page: number, size: number) => void;
}


const AddEditActivity: React.FC<AddEditActivityProps> = ({isAdd, setToEditActivity, activity, setActiveTabKey, fetchActivities}) => {
    const [addActivityLoading, setAddActivityLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [activityData, setActivityData] = useState<AddActivityRequest>({
        title: activity?.title ?? '',
        dest_id: activity?.dest_id ?? '',
        price: activity?.price ?? 0,
        description: activity?.description ?? ''
    });

    useEffect(() => {
        const { title, dest_id, price, description } = activityData;
        setIsFormValid(!!(title && dest_id && price !== undefined && description ));
    }, [activityData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if(name === "price")  setActivityData({ ...activityData, [name]: parseInt(value, 10) });
        else setActivityData({ ...activityData, [name]: value });
    };


    const handleSubmit = async () => {
        setAddActivityLoading(true);
        if(isAdd && setActiveTabKey){
             ActivityService.addActivity(activityData)
                .then((response) => {
                    message.success('Activity Added Successfully');
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while adding Activity.', error);
                    message.error(error.message || 'Error while adding Activity.');
                })
                .finally(() => {
                    setActivityData({
                        title: '',
                        dest_id: '',
                        price: 0,
                        description: ''
                    })
                    setAddActivityLoading(false);
                    fetchActivities(1, 10);
                });
        }
        else if(activity && setToEditActivity && setActiveTabKey){
            ActivityService.editActivity(activity.id, activityData)
                .then((response) => {
                     message.success('Activity Added Successfully');
                    setToEditActivity(null);
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while editing Activity.', error);
                    message.error(error.message || 'Error while editing Activity.');
                })
                .finally(() => {
                    setAddActivityLoading(false);
                    fetchActivities(1, 10);
                });
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-[100%] min-h-[650px]" style={{backgroundColor: ColorConstants.white }}>
            <div className="w-full sm:w-[60%] flex-1 p-[20px]">
                
                <div className="flex justify-between items-center mb-[30px]">
                    <Typography.Title style={{fontSize: '20px', fontWeight: 500, margin: 0}}>Add the Details of Activity</Typography.Title>
                    <p className="add_tour_add_step">STEP 01/01</p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <ManageFormInput value={activityData.title} handleChange={handleChange} label={"Title"} isMandatory={true} id={"title"} type={"text"} />
                    <ManageFormInput value={activityData.dest_id} handleChange={handleChange} label={"Destination Id"} isMandatory={true} id={"dest_id"} type={"text"} />
                    <ManageFormInput value={activityData.description} handleChange={handleChange} label={"Description"} isMandatory={true} id={"description"} type={"text"} />
                    <ManageFormInput value={activityData.price} handleChange={handleChange} label={"Price"} isMandatory={true} id={"price"} type={"number"} />
                    <div className="flex justify-center pt-5 gap-[20px]">
                        {!isAdd && setToEditActivity && setActiveTabKey && <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.darkGrey2, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} onClick={() => {setActiveTabKey('1'); setToEditActivity(null)}}>BACK</button>}
                        <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} disabled={!isFormValid} onClick={handleSubmit}>{isAdd? 'ADD' : 'EDIT'}</button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[40%]">
                <img src={ActivityBackground} className="w-full h-full object-cover overflow-hidden" />
            </div>

            {addActivityLoading && (<LoadingOverlay />)}
        </div>
    )
}

export default AddEditActivity;