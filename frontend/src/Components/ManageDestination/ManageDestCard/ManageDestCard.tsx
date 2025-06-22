import React, {memo} from 'react'
import { Destination } from '../../../types/destination.types'
import './manage-dest-card.css'

interface DestCardProps {
    destination: Destination,
    setToEditDestination: React.Dispatch<React.SetStateAction<Destination | null>>, 
    setToDeleteDestination: React.Dispatch<React.SetStateAction<string>>
}

const ManageDestCard: React.FC<DestCardProps> = ({destination, setToEditDestination, setToDeleteDestination})=>{
    return(
        <div key={destination.id} className="add_dest_card">
            <div className="w-[100%] h-[200px] overflow-hidden">
                {destination.image &&  <img src={`${process.env.REACT_APP_BE_URL}/${destination.image.replace(/\\/g, '/')}`} loading="lazy" className="w-full h-full object-cover" style={{borderRadius: '5px 5px 0 0'}} alt="destination poster"/>}
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">id:</span> {destination.id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">Tour id:</span> {destination.tour_id}</p>
            </div>
            <div className="flex flex-wrap justify-between items-center py-1 px-2">
                <p className="m-0 font-bold text-lg w-1/2">{destination.title}</p>
            </div>                                   
            <div className="py-1 px-2 h-[100px] overflow-hidden" style={{textOverflow: 'ellipsis'}}>
                <p className="m-0"><span className="font-semibold">Description: </span>{destination.description}</p>
            </div>
            <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer add_dest_card_icon">
                <i onClick={() => setToEditDestination(destination)} className="ri-pencil-fill cursor-pointer"></i>
                <i onClick={() => setToDeleteDestination(destination.id)} className="ri-delete-bin-6-line cursor-pointer"></i>
            </div>
        </div>
    )
}

export default memo(ManageDestCard);