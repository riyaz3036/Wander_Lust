import React,{memo} from 'react'
import DestinationCard from '../common/DestinationCard/DestinationCard'
import {Col } from 'reactstrap'

interface DestinationListProps {
    destinations: any;
}


const DestinationList: React.FC<DestinationListProps> =({destinations})=>{
    return (
        <>
            {
                destinations?.map((dest: any) => (
                <Col lg="3" className="mb-4" key={dest._id}>
                    <DestinationCard dest={dest}/>
                </Col>
                ))
            } 
        </>
    )
};

export default memo(DestinationList);
