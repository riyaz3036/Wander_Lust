import React,{memo} from 'react'

interface ActivityCardProps {
    activity: any,
    setEdit: any,
    setDelete: any
}

const ActivityCard:React.FC<ActivityCardProps> = ({activity, setEdit, setDelete}) =>{
    return (
        <div key={activity._id} className="add_tour_card">
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">#id:</span> {activity._id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 text-lg"><span className="font-semibold">Destination #id:</span> {activity.dest_id}</p>
            </div>
            <div className="flex flex-wrap py-1 px-2">
                <p className="m-0 font-semibold w-1/2">₹{activity.price}</p>
            </div>                                   
            <div className="flex justify-between items-center py-1 px-2">
                <p className="m-0 font-bold text-lg truncate w-1/2">{activity.title}</p>
            </div>                                   
            <div className="py-1 px-2 add_tour_desc">
                <p className="m-0"><span className="font-semibold">Description: </span>{activity.description}</p>
            </div>
            <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer">
                <i onClick={() => setEdit(activity)} className="ri-pencil-fill cursor-pointer hover:underline"></i>
                <i onClick={() => setDelete(activity._id)} className="ri-delete-bin-6-line cursor-pointer hover:underline"></i>
            </div>
        </div>        
    )
}

export default memo(ActivityCard);