import React,{memo} from 'react'
import { Activity } from '../../../types/activity.types';
import './manage-activity-card.css'

interface ManageActivityCardProps {
    activity: Activity,
    setToEditActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
    setToDeleteActivity: React.Dispatch<React.SetStateAction<string>>
}

const ActivityCard:React.FC<ManageActivityCardProps> = ({activity, setToEditActivity, setToDeleteActivity}) =>{
    return (
        <div key={activity.id} className="manage_activity_card">
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">id:</span> {activity.id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">Destination id:</span> {activity.dest_id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 font-semibold w-1/2">₹{activity.price}</p>
            </div>                                   
            <div className="flex justify-between items-center py-1 px-2">
                <p className="m-0 font-bold text-lg truncate w-1/2">{activity.title}</p>
            </div>                                   
            <div className="py-1 px-2 h-[75px] overflow-hidden" style={{textOverflow: 'ellipsis'}}>
                <p className="m-0"><span className="font-semibold">Description: </span>{activity.description}</p>
            </div>
            <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer add_activity_card_icon">
                <i onClick={() => setToEditActivity(activity)} className="ri-pencil-fill cursor-pointer"></i>
                <i onClick={() => setToDeleteActivity(activity.id)} className="ri-delete-bin-6-line cursor-pointer"></i>
            </div>
        </div>        
    )
}

export default memo(ActivityCard);