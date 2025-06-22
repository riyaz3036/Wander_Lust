import { message, Modal, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import AddEditDestination from '../../components/ManageDestination/AddEditDestination';
import Loading from '../../components/common/Loading/Loading';
import ColorConstants from '../../constants/ColorConstants';
import DestinationService from '../../service/destination.service';
import '../../styles/add-tour.css';
import { Destination } from '../../types/destination.types';
import AllDestinations from '../../components/ManageDestination/AllDestinations';



const ManageDestination = () => {
    const [toEditDestination, setToEditDestination] = useState<Destination | null>(null);  
    const [toDeleteDestination, setToDeleteDestination] = useState<string>('');
    const [activeTabKey, setActiveTabKey] = useState<string>('1');
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});
    

    const fetchDestinations = (page: number, size: number) => {
        setLoading(true);
        DestinationService.fetchDestinationsWithPagination(page, size)
            .then((response) => {
                setDestinations(response?.data);
                 setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching Destinations.', error);
                message.error(error.message || 'Error while fetching Destinations.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchDestinations(1, 10);
    }, []);


    useEffect(() => {
       fetchDestinations(pagination.page, pagination.size);
    }, [pagination.page, pagination.size]);


    useEffect(() => {
        if (toEditDestination) setActiveTabKey('3');
    }, [toEditDestination]);
    
    const TabItems = [{
        key: '1',
        label: 'All Destinations',
        children: (<AllDestinations pagination={pagination} destinations={destinations} setPagination={setPagination} loading={loading} setToDeleteDestination={setToDeleteDestination} setToEditDestination={setToEditDestination}/>)
    }, 
    {
        key: '2',
        label: 'Add Destination',
        children: (<AddEditDestination setActiveTabKey={setActiveTabKey} fetchDestinations={fetchDestinations} isAdd={true} />)
    },
    ...(toEditDestination
    ? [
        {
          key: '3',
          label: 'Edit Destination',
          children: <AddEditDestination fetchDestinations={fetchDestinations} isAdd={false} setToEditDestination={setToEditDestination} destination={toEditDestination} setActiveTabKey={setActiveTabKey}/>,
        },
      ]
    : [])
    ];


    const deleteDestination = async () => {
        setDeleteLoading(true);
        DestinationService.deleteDestination(toDeleteDestination)
            .then((response) => {
                message.success('Destination Deleted Successfully');
                setToDeleteDestination('');
                setActiveTabKey('1');
            })
            .catch((error) => {
                console.error('Error while deleting Destination.', error);
                message.error(error.message || 'Error while deleting Destination.');
            })
            .finally(() => {
                setDeleteLoading(false);
                fetchDestinations(1, 10);
            });
    };

    
    return (
        <div>
            {/* Buttons Section */}
            <div>
                 <Tabs
                    activeKey={activeTabKey}
                    onChange={(key) => {setToEditDestination(null); setActiveTabKey(key)}}
                    type="card"
                    items={TabItems}
                    tabBarStyle={{ marginBottom: 0 }}
                />
            </div>

            <Modal 
                    open={toDeleteDestination.length !== 0}
                    footer={!deleteLoading ? (
                    <div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                        <button style={{backgroundColor: ColorConstants.black, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={() => setToDeleteDestination('')}>No</button>
                        <button style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={deleteDestination}>Yes</button>
                    </div>
                    ) : (
                        <></>
                    )}
                    onCancel={() => setToDeleteDestination('')}
                >
                        {deleteLoading ? (
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                                <Loading />
                            </div>
                        ): (
                            <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to delete this Destination?</Typography.Title>
                        )}
                </Modal>            
        </div>
    );
}

export default ManageDestination;
