import { message, Modal, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Loading from '../../components/common/Loading/Loading';
import AllBookings from '../../components/ManageBooking/AllBookings';
import ColorConstants from '../../constants/ColorConstants';
import BookingService from '../../service/booking.service';
import '../../styles/my-bookings.css';
import { Booking } from '../../types/booking.types';


const ManageBooking = () => {
    const [toDeleteBooking, setToDeleteBooking] = useState<string>('');
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [activeTabKey, setActiveTabKey] = useState<string>('1');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});


    const fetchBookings = (page: number, size: number) => {
        setLoading(true);
        BookingService.fetchBookingsWithPagination(page, size)
            .then((response) => {
                setBookings(response?.data);
                setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching Bookings.', error);
                message.error(error.message || 'Error while fetching Bookings.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchBookings(1, 10);
    }, []);

    useEffect(() => {
       fetchBookings(pagination.page, pagination.size);
    }, [pagination.page, pagination.size]);


    const TabItems = [{
            key: '1',
            label: 'All Bookings',
            children: (<AllBookings loading={loading} bookings={bookings} pagination={pagination} setPagination={setPagination} setToDeleteBooking={setToDeleteBooking} />)
        }
    ];


  const deleteBooking = async () => {
      setDeleteLoading(true);
      BookingService.deleteBooking(toDeleteBooking)
          .then((response) => {
            message.success('Deleted Booking successfully');
              setToDeleteBooking('');
          })
          .catch((error) => {
              console.error('Error while deleting Booking.', error);
              message.error(error.message || 'Error while deleting Booking.');
          })
          .finally(() => {
              setDeleteLoading(false);
              fetchBookings(1, 10);
          });
  };
 

  return (
    <div>
        {/* Buttons Section */}
        <div>
            <Tabs
                activeKey={activeTabKey}
                onChange={(key) => setActiveTabKey(key)}
                type="card"
                items={TabItems}
                tabBarStyle={{ marginBottom: 0 }}
            />
        </div>
        <Modal 
            open={toDeleteBooking.length !== 0}
            footer={!deleteLoading ? (
            <div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                <button style={{backgroundColor: ColorConstants.black, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={() => setToDeleteBooking('')}>No</button>
                <button style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={deleteBooking}>Yes</button>
            </div>
            ) : (
                <></>
            )}
            onCancel={() => setToDeleteBooking('')}
        >
              {deleteLoading ? (
                  <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                      <Loading />
                  </div>
              ): (
                  <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to delete this booking?</Typography.Title>
              )}
        </Modal>
    </div>
  );
};

export default ManageBooking;
