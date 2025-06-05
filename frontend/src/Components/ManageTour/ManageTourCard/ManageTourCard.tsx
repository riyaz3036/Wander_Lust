import React, { memo } from 'react';
import './tour-card.css';
import { Tour } from '../../../types/tour.types';
import noImage from '../../../assets/images/no-image.jpg'

interface TourCardProps {
    tour: Tour;
    setToEditTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    setToDeleteTour: React.Dispatch<React.SetStateAction<string>>;
}

const ManageTourCard: React.FC<TourCardProps> = ({tour,setToDeleteTour,setToEditTour}) =>{

    const formatDate = (dateString: any) => {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return(
        <div key={tour.id} className="add_tour_card overflow-hidden">
            <div className="h-[230px] w-full">
                <img src={tour.image ? `${process.env.REACT_APP_LOCAL_BE_URL}/${tour.image.replace(/\\/g, '/')}`: noImage} loading="lazy" alt="tour poster" className="h-full w-full object-cover" />
            </div>
            <div className="px-[20px] py-[10px]">
                <div className="flex">
                    <p className="m-0 text-lg"><span className="font-semibold">id:</span> {tour.id}</p>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1">
                    <p className="m-0 font-bold text-lg w-1/2">{tour.title}</p>
                    <p className="m-0 font-semibold w-1/2 text-right">{tour.location}</p>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1">
                    <p className="m-0 font-semibold w-1/2">{tour.duration}</p>
                    <p className="m-0 font-semibold w-1/2 text-right">₹{tour.price}</p>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1">
                    <p className="m-0 font-semibold w-1/2">Availability: {tour.vacancy}/{tour.capacity}</p>
                    <p className="m-0 font-semibold w-1/2 text-right">{formatDate(tour.start_date)}</p>
                </div>
                <div className="py-1 h-[100px] overflow-hidden" style={{textOverflow: 'ellipsis'}}>
                    <p className="m-0"><span className="font-semibold">Description: </span>{tour.description}</p>
                </div>
            </div>
            
            <div className="flex justify-end gap-4 py-2 px-3 text-2xl cursor-pointer add_tour_card_icon">
                <i onClick={() => setToEditTour(tour)} className="ri-pencil-fill cursor-pointer"></i>
                <i onClick={() => setToDeleteTour(tour.id)} className="ri-delete-bin-6-line cursor-pointer"></i>
            </div>
        </div>
    )
}

export default memo(ManageTourCard);