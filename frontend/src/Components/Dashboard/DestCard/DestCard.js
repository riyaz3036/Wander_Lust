import React, {memo} from 'react'
import { BASE_URL } from '../../../utils/config'

const DestCard = ({destination, setEdit, setDelete})=>{
    return(
        <div key={destination._id} className="add_tour_card">
            <div className="add_tour_card_img">
                <img src={`${BASE_URL}/${destination.image.replace(/\\/g, '/')}`} loading="lazy" alt="destination poster"/>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">#id:</span> {destination._id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">Tour #id:</span> {destination.tour_id}</p>
            </div>
            <div className="flex flex-wrap justify-between items-center py-1 px-2">
                <p className="m-0 font-bold text-lg w-1/2">{destination.title}</p>
            </div>                                   
            <div className="py-1 px-2 add_tour_desc">
                <p className="m-0"><span className="font-semibold">Description: </span>{destination.description}</p>
            </div>
            <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer">
                <i onClick={() => setEdit(destination)} className="ri-pencil-fill cursor-pointer hover:underline"></i>
                <i onClick={() => setDelete(destination._id)} className="ri-delete-bin-6-line cursor-pointer hover:underline"></i>
            </div>
        </div>
    )
}

export default memo(DestCard);