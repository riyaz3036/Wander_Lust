import React from 'react'
import TourCard from '../../shared/TourCard'
import {Col } from 'reactstrap'

const PackageList =({tours})=>{
    return <>


{
        tours?.map(tour=>(
       <Col lg="3" className="mb-4" key={tour._id}>
        <TourCard tour={tour}/>
        </Col>
    ))

}


    </>
};

export default PackageList;
