import React, { memo } from 'react';
import { Card } from 'reactstrap';
import './destination-card.css';
import { Destination } from '../../../../types/destination.types';
import { useNavigate } from 'react-router-dom';
import RouteConstants from '../../../../constants/RouteConstants';

interface DestinationCardProps {
    destination: Destination
}

const DestinationCard: React.FC<DestinationCardProps> =({destination})=>{
    const navigate = useNavigate();
    return (
        <div className="dest__card cursor-pointer" onClick={() => navigate(`${RouteConstants.allTours}?destId=${destination.id}`)}>
            <Card>
                <div className="dest__img">
                    {destination.image && <img src={`${process.env.REACT_APP_LOCAL_BE_URL}/${destination?.image.replace(/\\/g, '/')}`} loading="lazy" alt="destination-image"/>}
                </div>
                <div className="p-3">
                    <h5 className="dest__title truncate">{destination.title}</h5>
                </div>
            </Card>
        </div>
    )
};

export default memo(DestinationCard);