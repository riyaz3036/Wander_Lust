import React,{useState, memo} from 'react'
import './tour-card.css'
import { BASE_URL } from '../../../utils/config';

interface TourCardProps {
    tour: any;
    setDelete: any;
    setEdit: any;
}

const TourCard: React.FC<TourCardProps> = ({tour,setDelete,setEdit}) =>{

    const formatDate = (dateString: any) => {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return(
        <div key={tour._id} className="add_tour_card">
            <div className="add_tour_card_img">
                <img src={`${BASE_URL}/${tour.image.replace(/\\/g, '/')}`} loading="lazy" alt="tour poster"/>
            </div>
            <div className="flex py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">#id:</span> {tour._id}</p>
            </div>
            <div className="flex flex-wrap justify-between items-center py-1 px-2">
                <p className="m-0 font-bold text-lg w-1/2">{tour.title}</p>
                <p className="m-0 font-semibold w-1/2 text-right">{tour.location}</p>
            </div>
            <div className="flex flex-wrap justify-between items-center py-1 px-2">
                <p className="m-0 font-semibold w-1/2">{tour.duration}</p>
                <p className="m-0 font-semibold w-1/2 text-right">₹{tour.price}</p>
            </div>
            <div className="flex flex-wrap justify-between items-center py-1 px-2">
                <p className="m-0 font-semibold w-1/2">Availability: {tour.vacancy}/{tour.capacity}</p>
                <p className="m-0 font-semibold w-1/2 text-right">{formatDate(tour.start_date)}</p>
            </div>
            <div className="py-1 px-2 add_tour_desc">
                <p className="m-0"><span className="font-semibold">Description: </span>{tour.description}</p>
            </div>
            <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer">
                <i onClick={() => setEdit(tour)} className="ri-pencil-fill cursor-pointer hover:underline"></i>
                <i onClick={() => setDelete(tour._id)} className="ri-delete-bin-6-line cursor-pointer hover:underline"></i>
            </div>
        </div>
    )
}

export default memo(TourCard);