import React, { memo } from 'react';
import { Destination } from '../../../types/destination.types';
import DestinationCard from './DestinationCard/DestinationCard';

interface DestinationListProps {
    destinations: Destination[];
}

const DestinationList: React.FC<DestinationListProps> =({destinations})=>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations?.map((destination: Destination) => (
                <div key={destination.id}>
                    <DestinationCard destination={destination}/>
                </div>
            ))} 
        </div>
    )
};

export default memo(DestinationList);
