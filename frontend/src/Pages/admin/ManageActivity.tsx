import { message, Modal, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Loading from '../../Components/common/Loading/Loading';
import ColorConstants from '../../constants/ColorConstants';
import ActivityService from '../../service/activity.service';
import '../../styles/add-tour.css';
import { Activity } from '../../types/activity.types';
import AllActivities from '../../Components/ManageActivity/AllActivities';
import AddEditActivity from '../../Components/ManageActivity/AddEditActivity';


const ManageActivity = () => {
    const [toEditActivity, setToEditActivity] = useState<Activity | null>(null);  
    const [toDeleteActivity, setToDeleteActivity] = useState<string>('');
    const [activeTabKey, setActiveTabKey] = useState<string>('1');
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});
    

    const fetchActivities = (page: number, size: number) => {
        setLoading(true);
        ActivityService.fetchActivitiesWIthPagination(page, size)
            .then((response) => {
                setActivities(response?.data);
                setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching Activities.', error);
                message.error(error.message || 'Error while fetching Activities.');
            })
            .finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        fetchActivities(1, 10);
    }, []);

    useEffect(() => {
       fetchActivities(pagination.page, pagination.size);
    }, [pagination.page, pagination.size]);


    useEffect(() => {
        if (toEditActivity) setActiveTabKey('3');
    }, [toEditActivity]);


    const TabItems = [{
        key: '1',
        label: 'All Activities',
        children: (<AllActivities pagination={pagination} setPagination={setPagination} activities={activities} loading={loading} setToDeleteActivity={setToDeleteActivity} setToEditActivity={setToEditActivity}/>)
    }, 
    {
        key: '2',
        label: 'Add Activity',
        children: (<AddEditActivity setActiveTabKey={setActiveTabKey} fetchActivities={fetchActivities} isAdd={true} />)
    },
    ...(toEditActivity
    ? [
        {
          key: '3',
          label: 'Edit Activity',
          children: <AddEditActivity fetchActivities={fetchActivities} isAdd={false} setToEditActivity={setToEditActivity} activity={toEditActivity} setActiveTabKey={setActiveTabKey}/>,
        },
      ]
    : [])
    ];
    
    const deleteActivity = async () => {
        setDeleteLoading(true);
        ActivityService.deleteActivity(toDeleteActivity)
            .then((response) => {
                message.success('Activity Deleted Successfully');
                setToDeleteActivity('');
               setActiveTabKey('1');
            })
            .catch((error) => {
                console.error('Error while deleting Activity.', error);
                message.error(error.message || 'Error while deleting Activity.');
            })
            .finally(() => {
                setDeleteLoading(false);
                fetchActivities(1, 10);
            });
    };
    

    return (
        <div>
            {/* Buttons Section */}
            <div>
                 <Tabs
                    activeKey={activeTabKey}
                    onChange={(key) => { setToEditActivity(null); setActiveTabKey(key)}}
                    type="card"
                    items={TabItems}
                    tabBarStyle={{ marginBottom: 0 }}
                />
            </div>

            <Modal 
                open={toDeleteActivity.length !== 0}
                footer={!deleteLoading ? (
                <div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                    <button style={{backgroundColor: ColorConstants.black, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={() => setToDeleteActivity('')}>No</button>
                    <button style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={deleteActivity}>Yes</button>
                </div>
                ) : (
                    <></>
                )}
                onCancel={() => setToDeleteActivity('')}
            >
                    {deleteLoading ? (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                            <Loading />
                        </div>
                    ): (
                        <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to delete this activity?</Typography.Title>
                    )}
            </Modal>
        </div>
    );
}

export default ManageActivity;
