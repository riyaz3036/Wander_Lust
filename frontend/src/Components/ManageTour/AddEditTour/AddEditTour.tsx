import { message, Typography } from "antd";
import { useEffect, useState } from "react";
import AdminBackground from '../../../assets/images/tour-background.jpg';
import ColorConstants from "../../../constants/ColorConstants";
import TourService from "../../../service/tour.service";
import { AddTourRequest, Tour } from "../../../types/tour.types";
import PageLoader from "../../common/FullPageLoader/PageLoader";
import ManageFormImage from "../../common/ManageFormImage/ManageFormImage";
import ManageFormInput from "../../common/ManageFormInput/ManageFormInput";

interface AddEditTourProps {
    isAdd: boolean;
    setToEditTour?: React.Dispatch<React.SetStateAction<Tour | null>>;
    tour?: Tour;
    setActiveTabKey?:  React.Dispatch<React.SetStateAction<string>>;
    fetchTours: (page: number, size: number) => void;
}

const AddEditTour: React.FC<AddEditTourProps> = ({isAdd, tour, setActiveTabKey, setToEditTour, fetchTours}) => {

    const [addTourLoading, setAddTourLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [tourData, setTourData] = useState<AddTourRequest>({
       title: tour?.title ?? '',
       location: tour?.location ?? '',
       description: tour?.description ?? '',
       duration: tour?.duration ?? '',
       price: tour?.price ?? 0,
       capacity: tour?.capacity ?? 0,
       vacancy: tour?.vacancy ?? 0,
       start_date: tour?.start_date ?? ''
    });
    const [tourImg, setTourImg] = useState<string | null>(tour?.image ?? null);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);

    useEffect(() => {
        const { title, location, description, duration, price, capacity, vacancy, start_date } = tourData;
        const isValid = 
            title.trim() !== '' &&
            location.trim() !== '' &&
            description.trim() !== '' &&
            start_date.trim() !== '' &&
            duration !== null && duration !== undefined &&
            price !== null && price !== undefined &&
            capacity !== null && capacity !== undefined &&
            vacancy !== null && vacancy !== undefined;

        setIsFormValid(isValid);
    }, [tourData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value });
    };
    

    const handleSubmit = async () => {
        setAddTourLoading(true);

        if(isAdd && setActiveTabKey){
             TourService.addTour(tourData, newImageFile || undefined)
                .then((response) => {
                    message.success('Tour Added Successfully');
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while adding Tour.', error);
                    message.error(error.message || 'Error while adding Tour.');
                })
                .finally(() => {
                    setTourData({
                        title: '',
                        location: '',
                        description: '',
                        duration: '',
                        price: 0,
                        capacity: 0,
                        vacancy: 0,
                        start_date: ''
                    })
                    setAddTourLoading(false);
                    fetchTours(1, 10);
                });
        }
        else if(tour && setToEditTour && setActiveTabKey){
            TourService.editTour(tour?.id, tourData, newImageFile || undefined)
                .then((response) => {
                    message.success('Tour Edited Successfully');
                    setToEditTour(null);
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while editing Activity.', error);
                    message.error(error.message || 'Error while editing Activity.');
                })
                .finally(() => {
                    setAddTourLoading(false);
                    fetchTours(1, 10);
                });
        }
    };


    return(
        <div className="flex flex-col md:flex-row w-[100%] min-h-[650px]" style={{backgroundColor: ColorConstants.white }}>
            <div className="w-full sm:w-[60%] flex-1 p-[20px]">
                
                <div className="flex justify-between items-center mb-[30px]">
                    <Typography.Title style={{fontSize: '20px', fontWeight: 500, margin: 0}}>Add the Details of Tour</Typography.Title>
                    <p className="add_tour_add_step">STEP 01/01</p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <ManageFormInput value={tourData.title} handleChange={handleChange} label={"Title"} isMandatory={true} id={"title"} type={"text"} />
                    <ManageFormInput value={tourData.location} handleChange={handleChange} label={"Location"} isMandatory={true} id={"location"} type={"text"} />
                    <ManageFormInput value={tourData.description} handleChange={handleChange} label={"Description"} isMandatory={true} id={"description"} type={"text"} />
                    <ManageFormImage setNewImageFile={setNewImageFile} newImageFile={newImageFile} value={tourImg} label={"Image"} isMandatory={false} id={"image"} type={isAdd ? "file" : "file"} />
                    <ManageFormInput value={tourData.duration} handleChange={handleChange} label={"Duration"} isMandatory={true} id={"duration"} type={"text"} />
                    <ManageFormInput value={tourData.price} handleChange={handleChange} label={"Price"} isMandatory={true} id={"price"} type={"number"} />
                    <ManageFormInput value={tourData.capacity} handleChange={handleChange} label={"Capacity"} isMandatory={true} id={"capacity"} type={"number"} />
                    <ManageFormInput value={tourData.vacancy} handleChange={handleChange} label={"Vacancy"} isMandatory={true} id={"vacancy"} type={"number"} />
                    <ManageFormInput value={tourData.start_date} handleChange={handleChange} label={"Start Date"} isMandatory={true} id={"start_date"} type={"date"} />
                    <div className="flex justify-center pt-5 gap-[20px]">
                        {!isAdd && setActiveTabKey && setToEditTour !== undefined && <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.darkGrey2, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} onClick={() => {setActiveTabKey('1'); setToEditTour(null)}}>BACK</button>}
                        <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} disabled={!isFormValid} onClick={handleSubmit}>{isAdd? 'ADD' : 'EDIT'}</button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[40%]">
                <img src={AdminBackground} className="w-full h-full object-cover overflow-hidden" />
            </div>

            {addTourLoading && (<PageLoader />)}
        </div>
    )
}

export default AddEditTour;