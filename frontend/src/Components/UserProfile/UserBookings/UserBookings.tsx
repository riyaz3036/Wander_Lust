import { memo, useEffect, useState } from 'react';
import { Booking } from '../../../types/booking.types';
import BookingCard from '../../common/BookingCard/BookingCard';
import DeleteBooking from '../DeleteBooking/DeleteBooking';
import './user-bookings.css';
import { useAuth } from '../../../auth/AuthProvider';
import BookingService from '../../../service/booking.service';
import { message, Modal, Pagination, Typography } from 'antd';
import ColorConstants from '../../../constants/ColorConstants';
import Loading from '../../common/Loading/Loading';


const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<string>('');
    const [pagination, setPagination] = useState<{page: number, size: number, total: number}>({page: 1, size: 10, total: 0});
    const [toDeleteBooking, setToDeleteBooking] = useState<string>('');
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const fetchBookings = async (page: number, size: number) => {
        if(!user) return;
        setBookingLoading(true);
        BookingService.fetchBookingsForUserWithPagination(user?.id, page, size)
            .then((response) => {
                setBookings(response?.data);
                setPagination({page: response.page, size: pagination.size, total: response.totalElements});
            })
            .catch((error) => {
                console.error('Error while fetching User Booings.', error);
                message.error(error.message || 'Error while fetching User Booings.');
                setBookingError(error.message || 'Error while fetching User Booings.');
            })
            .finally(() => {
                setBookingLoading(false);
            });
    }

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
    
    useEffect(()=>{
        fetchBookings(1, 10);
    },[]);

    useEffect(() => {
       fetchBookings(pagination.page, pagination.size);
    }, [pagination.page, pagination.size]);

    const handleTableChange = (page: number, size: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: page,
            size: size 
        }));
    };

  return (
    <>
        {bookingError && (<p className="p-5 add_tour_error">{bookingError}</p>)}
        {bookingLoading && (
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                <Loading />
            </div>
        )}
        {bookingError.length === 0 && !bookingLoading && bookings.length !== 0 && (
             <div className="flex flex-col gap-3 profile_bookings">
                <h5 className="profile_bookings_title">My Bookings:</h5>
                <div className="flex flex-col gap-3 profile_bookins_main">
                    {bookings.map((booking: Booking) => (
                        <BookingCard booking={booking} setToDeleteBooking={setToDeleteBooking}/>
                    ))}
                </div>
                
                {bookings.length > 0 && (
                <div className="flex justify-center my-[60px]">
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.size}
                        total={pagination.total}
                        showSizeChanger
                        pageSizeOptions={['5', '10']}
                        onChange={handleTableChange}
                    />
                </div>
            )}
            </div>
        )}


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
                  <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to cancel this booking?</Typography.Title>
              )}
        </Modal>
    </>
    
   
  );
};

export default memo(UserBookings);
