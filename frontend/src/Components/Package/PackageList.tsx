import React,{memo} from 'react'
import {Col } from 'reactstrap'
import TourCard from '../common/TourCard/TourCard';

interface PackageListProps {
    tours: any;
}


const PackageList:React.FC<PackageListProps> =({tours})=>{
    return(
        <>
            {
                tours?.map((tour: any)=>(
                <Col lg="3" className="mb-4" key={tour._id}>
                <TourCard tour={tour}/>
                </Col>
                ))
            }
        </>
    )
};

export default memo(PackageList);
