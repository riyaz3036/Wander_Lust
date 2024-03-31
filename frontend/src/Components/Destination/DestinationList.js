import React from 'react'
import DestinationCard from '../../shared/DestinationCard'
import {Col } from 'reactstrap'

const DestinationList =({destinationData})=>{

  
    return <>


 {
        destinationData?.map(dest=>(
       <Col lg="3" className="mb-4" key={dest._id}>
        <DestinationCard dest={dest}/>
        </Col>
    ))

} 


    </>
};

export default DestinationList;
