import { message } from 'antd';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/common/LoadingOverlay/LoadingOverlay';
import ColorConstants from '../../constants/ColorConstants';
import AnalyticsService from '../../service/analytics.service';
import '../../styles/dashboard-analytics.css';
import { AnalyticsCount } from '../../types/analytics.types';
import AnalyticsCard from '../../components/DashboardAnalytics/AnalyticsCard';


const DashboardAnalytics = () => {
    const [count, setCount] = useState<AnalyticsCount>();
    const [countLoading,setCountLoading] = useState<boolean>(false);
    const [countError,setCountError] = useState<string>('');

    const fetchCount = () => {
        setCountLoading(true);
        AnalyticsService.getCount()
            .then((response) => {
                setCount(response?.data);
            })
            .catch((error) => {
                console.error('Error while fetching analytics.', error);
                message.error(error.message || 'Error while fetching analytics.');
                setCountError(error.message || 'Error while fetching analytics.')
            })
            .finally(() => {
                setCountLoading(false);
            });
    }


    useEffect(() => {
        fetchCount();
    }, []);


    return (
        <div className="p-[10px]" style={{backgroundColor: ColorConstants.white }}>
            {countError && (<p className="p-5 add_tour_error">{countError}</p>)}
            {count && !countError && !countLoading && (
            <div className="analytics_display_cards">
                <AnalyticsCard title={"Users"} value={count.users} color={ColorConstants.analyticsCard1} icon={<i className="ri-group-line" style={{margin: 0, color: ColorConstants.analyticsCard1, fontSize: '30px'}}></i>} />
                <AnalyticsCard title={"Tours"} value={count.tours} color={ColorConstants.analyticsCard2} icon={<i className="ri-suitcase-3-line" style={{margin: 0, color: ColorConstants.analyticsCard2, fontSize: '30px'}}></i>}  /> 
                <AnalyticsCard title={"Destinations"} value={count.destinations} color={ColorConstants.analyticsCard3} icon={<i className="ri-road-map-line" style={{margin: 0, color: ColorConstants.analyticsCard3, fontSize: '30px'}}></i>}/>
                <AnalyticsCard title={"Activities"} value={count.activities} color={ColorConstants.analyticsCard4} icon={<i className="ri-run-line" style={{margin: 0, color: ColorConstants.analyticsCard4, fontSize: '30px'}}></i>}/>
                <AnalyticsCard title={"Bookings"} value={count.bookings} color={ColorConstants.analyticsCard5} icon={<i className="ri-booklet-line" style={{margin: 0, color: ColorConstants.analyticsCard5, fontSize: '30px'}}></i>}/>
            </div>                    
            )}
            {countLoading && (<LoadingOverlay />)}
        </div>
    );
}

export default DashboardAnalytics;
