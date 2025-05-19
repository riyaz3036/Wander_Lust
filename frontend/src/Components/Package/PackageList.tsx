import React,{memo} from 'react'
import TourCard from '../../shared/TourCard'
import {Col } from 'reactstrap'

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
