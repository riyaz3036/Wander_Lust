import { useEffect, useState } from "react";
import { AddDestinationRequest, Destination } from "../../types/destination.types";
import { message, Typography } from "antd";
import DestinationService from "../../service/destination.service";
import ColorConstants from "../../constants/ColorConstants";
import ManageFormInput from "../common/ManageFormInput/ManageFormInput";
import DestinationBackground from '../../assets/images/dest-background.jpg'
import ManageFormImage from "../common/ManageFormImage/ManageFormImage";
import LoadingOverlay from "../common/LoadingOverlay/LoadingOverlay";

interface AddEditDestinationProps {
    isAdd: boolean;
    setToEditDestination?: React.Dispatch<React.SetStateAction<Destination | null>>;
    destination?: Destination;
    setActiveTabKey?:  React.Dispatch<React.SetStateAction<string>>
    fetchDestinations: (page: number, size: number) => void;
}


const AddEditDestination: React.FC<AddEditDestinationProps> = ({isAdd, setToEditDestination, destination, setActiveTabKey, fetchDestinations}) => {
    const [addDestinationLoading, setAddDestinationLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [destinationData, setDestinationData] = useState<AddDestinationRequest>({
        title: destination?.title ?? '',
        tour_id: destination?.tour_id ?? '',
        description: destination?.description ?? ''
    });
    const [destImg, setDestImg] = useState<string | null>(destination?.image ?? null);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);

    useEffect(() => {
        const { title, tour_id, description } = destinationData;
        setIsFormValid(!!(title && tour_id && description ));
    }, [destinationData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDestinationData({ ...destinationData, [name]: value });
    };


    const handleSubmit = async () => {
        setAddDestinationLoading(true);
        if(isAdd && setActiveTabKey){
             DestinationService.addDestination(destinationData, newImageFile || undefined)
                .then((response) => {
                    message.success('Destination Added Successfully');
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while adding Destination.', error);
                    message.error(error.message || 'Error while adding Destination.');
                })
                .finally(() => {
                    setDestinationData({
                        title: '',
                        tour_id: '',
                        description: ''
                    })
                    setAddDestinationLoading(false);
                    fetchDestinations(1, 10);
                });
        }
        else if(destination && setToEditDestination && setActiveTabKey){
            DestinationService.editDestination(destination?.id, destinationData, newImageFile || undefined)
                .then((response) => {
                    message.success('Destination Edited Successfully');
                    setToEditDestination(null);
                    setActiveTabKey('1');
                })
                .catch((error) => {
                    console.error('Error while editing Destination.', error);
                    message.error(error.message || 'Error while editing Destination.');
                })
                .finally(() => {
                    setAddDestinationLoading(false);
                    fetchDestinations(1, 10);
                });
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-[100%] min-h-[650px]" style={{backgroundColor: ColorConstants.white }}>
            <div className="w-full sm:w-[60%] flex-1 p-[20px]">
                
                <div className="flex justify-between items-center mb-[30px]">
                    <Typography.Title style={{fontSize: '20px', fontWeight: 500, margin: 0}}>Add the Details of Destination</Typography.Title>
                    <p className="add_tour_add_step">STEP 01/01</p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <ManageFormInput value={destinationData.title} handleChange={handleChange} label={"Title"} isMandatory={true} id={"title"} type={"text"} />
                    <ManageFormInput value={destinationData.tour_id} handleChange={handleChange} label={"Tour Id"} isMandatory={true} id={"tour_id"} type={"text"} />
                    <ManageFormInput value={destinationData.description} handleChange={handleChange} label={"Description"} isMandatory={true} id={"description"} type={"text"} />
                    <ManageFormImage setNewImageFile={setNewImageFile} newImageFile={newImageFile} value={destImg} label={"Image"} isMandatory={false} id={"image"} type={isAdd ? "file" : "file"} />
                    <div className="flex justify-center pt-5 gap-[20px]">
                        {!isAdd && setActiveTabKey && setToEditDestination !== undefined && <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.darkGrey2, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} onClick={() => {setActiveTabKey('1'); setToEditDestination(null);}}>BACK</button>}
                        <button className="rounded-[5px] px-[40px] py-[5px]" style={{ fontWeight: 500, backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, opacity: isFormValid ? 1 : 0.5 }} disabled={!isFormValid} onClick={handleSubmit}>{isAdd? 'ADD' : 'EDIT'}</button>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[40%]">
                <img src={DestinationBackground} className="w-full h-full object-cover overflow-hidden" />
            </div>

            {addDestinationLoading && (<LoadingOverlay />)}
        </div>
    )
}

export default AddEditDestination;