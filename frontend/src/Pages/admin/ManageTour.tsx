import { message, Modal, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Loading from '../../Components/common/Loading/Loading';
import AddEditTour from '../../Components/ManageTour/AddEditTour/AddEditTour';
import AllTours from '../../Components/ManageTour/AllTours/AllTours';
import ColorConstants from '../../constants/ColorConstants';
import TourService from '../../service/tour.service';
import '../../styles/add-tour.css';
import { Tour } from '../../types/tour.types';



const ManageTour = () => {
    const [toEditTour, setToEditTour] = useState<Tour | null>(null);  
    const [toDeleteTour, setToDeleteTour] = useState<string>('');
    const [activeTabKey, setActiveTabKey] = useState<string>('1');
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});

    const fetchTours = (page: number, size: number) => {
        setLoading(true);
        TourService.fetchTourWithPagination(page, size)
            .then((response) => {
                setTours(response?.data);
                setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching Tours.', error);
                message.error(error.message || 'Error while fetching Tours.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
       fetchTours(pagination.page, pagination.size);
    }, [pagination.page, pagination.size]);

    useEffect(() => {
        fetchTours(1, 10);
    }, []);


    useEffect(() => {
        if (toEditTour) setActiveTabKey('3');
    }, [toEditTour]);


    const TabItems = [{
        key: '1',
        label: 'All Tours',
        children: (<AllTours loading={loading} tours={tours} pagination={pagination} setPagination={setPagination} setToDeleteTour={setToDeleteTour} setToEditTour={setToEditTour} />)
    }, 
    {
        key: '2',
        label: 'Add Tour',
        children: (<AddEditTour setActiveTabKey={setActiveTabKey} fetchTours={fetchTours} isAdd={true} />)
    },
    ...(toEditTour
    ? [
        {
          key: '3',
          label: 'Edit Tour',
          children: <AddEditTour fetchTours={fetchTours} isAdd={false} setToEditTour={setToEditTour} tour={toEditTour} setActiveTabKey={setActiveTabKey}/>,
        },
      ]
    : [])
    ];


    const deleteTour = async () => {
        setDeleteLoading(true);
        TourService.deleteTour(toDeleteTour)
            .then((response) => {
                message.success('Tour Deleted Successfully');
                setToDeleteTour('');
                setActiveTabKey('1');
            })
            .catch((error) => {
                console.error('Error while deleting Tour.', error);
                message.error(error.message || 'Error while deleting Tour.');
            })
            .finally(() => {
                setDeleteLoading(false);
                fetchTours(1, 10);
            });
    };

    return (
        <div>
            {/* Buttons Section */}
            <div>
                 <Tabs
                    activeKey={activeTabKey}
                    onChange={(key) => {setToEditTour(null); setActiveTabKey(key)}}
                    type="card"
                    items={TabItems}
                    tabBarStyle={{ marginBottom: 0 }}
                />
            </div>

            <Modal 
                open={toDeleteTour.length !== 0}
                footer={!deleteLoading ? (
                <div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                    <button style={{backgroundColor: ColorConstants.black, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={() => setToDeleteTour('')}>No</button>
                    <button style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={deleteTour}>Yes</button>
                </div>
                ) : (
                    <></>
                )}
                onCancel={() => setToDeleteTour('')}
            >
                    {deleteLoading ? (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                            <Loading />
                        </div>
                    ): (
                        <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to delete this tour?</Typography.Title>
                    )}
            </Modal>
        </div>
    );
}

export default ManageTour;
