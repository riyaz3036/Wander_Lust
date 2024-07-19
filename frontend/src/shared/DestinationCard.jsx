import React from 'react'
import './destination-card.css'
import {Card, CardBody} from 'reactstrap';
import { BASE_URL } from '../utils/config';


const DestinationCard =({dest})=>{
    const { title}= dest
    return (
        <div className="dest__card">
            <Card>
                <div className="dest__img bg-red-300">
                    <img src={`${BASE_URL}/${dest.image.replace(/\\/g, '/')}`} alt="destination-image"/>
                </div>
                <div className="p-3">
                    <h5 className="dest__title truncate">{title}</h5>
                </div>
            </Card>
        </div>
    )
};

export default DestinationCard;