import { Pagination } from "antd";
import ColorConstants from "../../../constants/ColorConstants";
import { Tour } from "../../../types/tour.types";
import LoadingOverlay from "../../common/LoadingOverlay/LoadingOverlay";
import ManageTourCard from "../ManageTourCard/ManageTourCard";

interface AllToursProps {
    setToEditTour: React.Dispatch<React.SetStateAction<Tour | null>>;
    setToDeleteTour: React.Dispatch<React.SetStateAction<string>>;
    pagination: {page: number, size: number, total: number};
    setPagination: React.Dispatch<React.SetStateAction<{page: number, size: number, total: number}>>;
    tours: Tour[];
    loading: boolean;
}

const AllTours: React.FC<AllToursProps> = ({setToEditTour, setToDeleteTour, pagination, setPagination, loading, tours}) => {
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
                <p className="text-2xl font-semibold">All Tours</p>
            </div>

            <div className="add_tour_cards">
                {loading && (<LoadingOverlay />)}
                {!loading && tours.length === 0 && (
                    <p className="text-center p-5 add_tour_error">No Tours added</p>
                )}
                {!loading &&
                    tours.map((tour) => (
                    <ManageTourCard tour={tour} setToEditTour={setToEditTour} setToDeleteTour={setToDeleteTour}/>
                ))}
            </div>

             { !loading && tours.length > 0 && (
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

export default AllTours;