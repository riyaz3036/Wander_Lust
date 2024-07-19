import React from 'react'
import DestinationCard from '../../shared/DestinationCard'
import {Col } from 'reactstrap'

const DestinationList =({destinations})=>{

  
    return <>


 {
        destinations?.map(dest=>(
       <Col lg="3" className="mb-4" key={dest._id}>
        <DestinationCard dest={dest}/>
        </Col>
    ))

} 


    </>
};

export default DestinationList;
