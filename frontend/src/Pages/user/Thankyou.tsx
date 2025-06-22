import { Typography } from 'antd';
import { memo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import ColorConstants from '../../constants/ColorConstants';
import '../../styles/thank-you.css';
import RouteConstants from '../../constants/RouteConstants';


const Thankyou = ()=>{
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
      
    return (
        <section>
            <div className="my-[45px] text-center bg-red-300">
                <div className="thank__you">
                    <span><i className="ri-checkbox-circle-line"></i></span>
                    <Typography.Title className="mb-3 fw-semibold" style={{fontSize: '36px'}}>Your trip is booked!</Typography.Title>
                    <Typography.Paragraph className="mb-4" style={{ fontSize: '20px', color: '#555' }}>
                        Start your countdown to adventure — we can't wait to see you there!
                    </Typography.Paragraph>
                    <button className="border-0 py-[5px] px-[15px] rounded-[5px]" style={{backgroundColor: ColorConstants.secondaryColor, outline: 'none', color: ColorConstants.white}} onClick={() => navigate(RouteConstants.home)}>Back to Home</button>
                </div>
            </div>
        </section>
    )
};


export default memo(Thankyou);

