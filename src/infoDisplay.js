import React, { useEffect } from 'react';
import store from './features/store'
import MapDisplay from './MapDisplay';
import TideInfo from './tideInfo';
import './infoDisplay.css'
import { animateTransition } from './uiControlFunctions'


function InfoDisplay(isLoaded) {

    useEffect(() => animateTransition(), [store.getState().uiControl.tideDropDown])

    return (
        <div className='InfoDisplay'>
            <div id="App-Map">
                <MapDisplay isLoaded={isLoaded}/>
            </div>
        
            <div id="App-Info">
                <TideInfo/> 
            </div>
        </div>

    )
}

export default InfoDisplay