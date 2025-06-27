import { Pagination } from "antd";
import ColorConstants from "../../constants/ColorConstants";
import { Booking } from "../../types/booking.types";
import BookingCard from "../common/BookingCard/BookingCard";
import PageLoader from "../common/FullPageLoader/PageLoader";

interface AllBookingsProps {
    setToDeleteBooking: React.Dispatch<React.SetStateAction<string>>;
    pagination: {page: number, size: number, total: number};
    setPagination: React.Dispatch<React.SetStateAction<{page: number, size: number, total: number}>>;
    bookings: Booking[];
    loading: boolean;
}

const AllBookings: React.FC<AllBookingsProps> = ({setToDeleteBooking, pagination, setPagination, loading, bookings}) => {
    
    const handleTableChange = (page: number, size: number) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: page,
            size: size 
        }));
    };

    return (
        <div className="p-[20px] flex flex-col gap-[10px]" style={{backgroundColor: ColorConstants.white }}>
            <div className="flex justify-between items-center add_tour_list_title_section">
                <p className="text-2xl font-semibold">All Bookings</p>
            </div>

            <div className="flex flex-col gap-[20px]">
                {loading && (<PageLoader />)}
                {!loading && bookings.length === 0 && (
                    <p className="text-center p-5 add_tour_error">No Bookings</p>
                )}
                {!loading &&
                    bookings.map((booking) => (
                    <BookingCard booking={booking} setToDeleteBooking={setToDeleteBooking} />
                ))}
            </div>

             { !loading &&  bookings.length > 0 && (
                <div className="flex justify-center mt-[20px]">
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
    )
}

export default AllBookings;