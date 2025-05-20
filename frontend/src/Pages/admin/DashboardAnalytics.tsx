import { useEffect, useState } from 'react';
import '../../styles/dashboard-analytics.css';
import { BASE_URL } from '../../utils/config';


const DashboardAnalytics = () => {
    const [count,setCount] = useState<any>({});
    const [countLoading,setCountLoading] = useState<any>(1);
    const [countError,setCountError] = useState('');

    useEffect(() => {
        
            const fetchCount = async () => {
                try {
                  const response = await fetch(`${BASE_URL}/analytics/count/`);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setCount(data);
                } catch (error) {
                  setCountError('Error loading bookings');
                } finally {
                  setCountLoading(false);
                }
              };
            fetchCount();
    }, []);


    return (
        <div>
            {countLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
            {countError && (<p className="p-5 add_tour_error">{countError}</p>)}
            {!countError && !countLoading && (
            <div className="analytics_display_cards">
                <div className="analytics_display_card" style={{backgroundColor: '#6a73fa'}}>
                    <div className="analytics_display_card_logo">
                        <i className="ri-group-line"></i>
                    </div>
                    <div className="analytics_display_card_main">
                        <p>USERS</p>
                        <p>{count.users}</p>
                    </div>
                </div>
                <div className="analytics_display_card" style={{backgroundColor: '#ffaa16'}}>
                    <div className="analytics_display_card_logo">
                        <i className="ri-suitcase-3-line"></i>
                    </div>
                    <div className="analytics_display_card_main">
                        <p>TOURS</p>
                        <p>{count.tours}</p>
                    </div>
                </div>
                <div className="analytics_display_card" style={{backgroundColor: '#673bb7'}}>
                    <div className="analytics_display_card_logo">
                        <i className="ri-road-map-line"></i>
                    </div>
                    <div className="analytics_display_card_main">
                        <p>DESTINATIONS</p>
                        <p>{count.destinations}</p>
                    </div>
                </div>
                <div className="analytics_display_card" style={{backgroundColor: '#ff1616'}}>
                    <div className="analytics_display_card_logo">
                        <i className="ri-run-line"></i>
                    </div>
                    <div className="analytics_display_card_main">
                        <p>ACTIVITIES</p>
                        <p>{count.activities}</p>
                    </div>
                </div>
                <div className="analytics_display_card" style={{backgroundColor: '#4a6f6f'}}>
                    <div className="analytics_display_card_logo">
                        <i className="ri-booklet-line"></i>
                    </div>
                    <div className="analytics_display_card_main">
                        <p>BOOKINGS</p>
                        <p>{count.bookings}</p>
                    </div>
                </div>
            </div>                    
            )}

        </div>
    );
}

export default DashboardAnalytics;
