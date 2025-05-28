import React,{memo} from 'react'
import './destination-card.css'
import {Card} from 'reactstrap';
import { BASE_URL } from '../../../utils/config';

interface DestinationCardProps {
    dest: any
}

const DestinationCard: React.FC<DestinationCardProps> =({dest})=>{
    const { title}= dest
    return (
        <div className="dest__card">
            <Card>
                <div className="dest__img">
                    <img src={`${BASE_URL}/${dest.image.replace(/\\/g, '/')}`} loading="lazy" alt="destination-image"/>
                </div>
                <div className="p-3">
                    <h5 className="dest__title truncate">{title}</h5>
                </div>
            </Card>
        </div>
    )
};

export default memo(DestinationCard);