import React from 'react';
import Map from './Map'


function MapDisplay({isLoaded}) {  


    if(!isLoaded) {
        return <div>Loading...</div>
    };

    return (
        <Map isLoaded={isLoaded}/>
    )
}


export default MapDisplay
