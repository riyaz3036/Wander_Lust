import { message } from 'antd';
import React, { memo, useState } from 'react';
import ActivityService from '../../service/activity.service';

interface DeleteActivityProps {
    setToDeleteActivity: React.Dispatch<React.SetStateAction<string>>;
    toDeleteActivity: string;
}

const DeleteActivity: React.FC<DeleteActivityProps> = ({ setToDeleteActivity, toDeleteActivity }) => {
    // To check if it is successfully deleted
    const [delSuccess, setDelSuccess] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    

    const deleteActivity = async () => {
        setLoading(true);
        ActivityService.deleteActivity(toDeleteActivity)
            .then((response) => {
                setDelSuccess(1);
                // done message (1 sec)
                setTimeout(() => {
                    setToDeleteActivity('');  
                    window.location.reload();  
                }, 1000);
            })
            .catch((error) => {
                console.error('Error while deleting Activity.', error);
                message.error(error.message || 'Error while deleting Activity.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="delete_tour_main">
            {
                delSuccess === 0 ?
                <div className="delete_tour_box">
                    <p className="delete_tour_ques">Are you sure you want to delete this Activity?</p>
                    <div className="delete_tour_bttns">
                        <button className="delete_tour_yes" onClick={deleteActivity}>Yes</button>
                        <button className="delete_tour_no" onClick={() => setToDeleteActivity('')}>No</button>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center gap-8 bg-white p-5 add_tour_add_success">
                    <div className="flex items-center justify-center add_tour_add_success_tick">
                        <i className="ri-check-line"></i>
                    </div>
                    <p className="font-medium">Deleted Activity Successfully</p>
                </div>
            }
        </div>
    );
}

export default memo(DeleteActivity);
