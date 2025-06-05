import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import './tour-card.css';
import { Tour } from '../../../../types/tour.types';
import { generateRoute } from '../../../../utils/generateRoute';

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> =({tour})=>{
    const { id , title, location, price}= tour;
    return (
        <div className="tour__card">
            <Card>
                <div className="tour__img">
                    {tour.image && <img src={`${process.env.REACT_APP_LOCAL_BE_URL}/${tour.image.replace(/\\/g, '/')}`} loading="lazy" alt="tour-image"/>}
                </div>
                <CardBody>
                    <div className="card__top d-flex align-items-center justify-content-between">
                        <span className="tour__location d-flex align-items-center gap-1">
                            <i className="ri-map-pin-line"></i>{location}
                        </span>
                    </div>
                    <h5 className="tour__title"><Link to={`/tours/${id}`}>{title}</Link></h5>
                    <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                        <h5>₹{price} <span>/ per person</span></h5>
                        <button className="btn booking__btn">
                            <Link to={generateRoute.tourDetails(id)}>Book Now</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default memo(TourCard);