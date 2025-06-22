import React, { memo } from 'react';
import { Tour } from '../../../types/tour.types';
import TourCard from './TourCard/TourCard';


interface TourListProps {
    tours: Tour[];
}


const TourList:React.FC<TourListProps> = ({tours})=>{
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours?.map((tour: Tour)=>(
                <div key={tour.id}>
                    <TourCard tour={tour}/>
                </div>
            ))}
        </div>
    )
};

export default memo(TourList);
