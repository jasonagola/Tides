import React, { useEffect, useState, useRef, Fragment, forwardRef, useImperativeHandle} from 'react';
import store from './features/store'
import MapDisplay from './MapDisplay';
import TideInfo from './tideInfo';
import './infoDisplay.css'
import TideChart from './tideChart';
import gsap from 'gsap'



function InfoDisplay(isLoaded) {

    const transitionTimeline = useRef(null)

    useEffect(() => {
        transitionTimeline.current = gsap.timeline()
            .to("#App-Map", {duration: .5, height: '20vh'})
            .to("#App-Info", {duration: .5, height: '60vh'},"<")
            .reverse()
        }, [])

        
    useEffect(() => {
        const toggleState = store.getState().uiControl.tideDropDown
        // console.log("This is the toggle state:" + toggleState)
        toggleState ? transitionTimeline.current.reverse(): transitionTimeline.current.play()
        
    }, [store.getState().uiControl.tideDropDown])
    

    const infoComponents = forwardRef((props, ref) => {
        const maps = useRef({});
        const tideInfo = useRef({});
        useImperativeHandle(ref, () => ({
            ...maps.current, 
            ...tideInfo.current,
        }));
        return (
            <div>
                <mapTarget ref={maps} />
                <tideInfoTarget ref={tideInfo}/>
            </div>
        );
    });


    return (
        <div className='InfoDisplay'>
                <div id='App-Map'>
                    <MapDisplay isLoaded={isLoaded}/>
                </div>
            
                <div id="App-Info">
                    <TideInfo/> 
                </div>
            </div>         

    )
}

export default InfoDisplay