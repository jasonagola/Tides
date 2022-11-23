import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { selectDataSource, selectMareaApiStatus, selectReportedPositionDistance, selectReportingPosition, selectTideExtremes } from './features/tide/tideSlice';
import { format } from 'date-fns';
import TideChart from './tideChart'
import './tideInfo.css'



function TideInfo() {

    const extremes = useSelector(selectTideExtremes)
    const distanceFromSearchMarker = useSelector(selectReportedPositionDistance)
    const mareaApiStatus = useSelector(selectMareaApiStatus)
    const dataSource = useSelector(selectDataSource)

    const today = new Date()

    const todayOrTomorrow = (date) => {    
        switch (date.getMonth(), date.getDate()) {
            case (today.getMonth(), today.getDate()):
                return "Today";
            case (today.getMonth(), today.getDate()+1):
                return "Tomorrow";
            default:
                return format(date, "eeee: MMM d ")
    }
}
    
    const renderExtremeData = () => {
        return extremes.map((extreme, index) => {
            const date = new Date(extreme.datetime)
            
            return ( <tr>
                        <th>{todayOrTomorrow(date)}</th>
                        <td key={index}>{extreme.state}</td>
                        <td>{format(date, "hh:mm aa")}</td>
                    </tr>    
                    )
            })
    }

    const risingOrFalling = () => {
        if (mareaApiStatus == 200) {
            switch (extremes[0].state) {
                case ('LOW TIDE'): 
                    return 'falling';
                case ('HIGH TIDE'):
                    return 'rising'
        }}
    }

    const nextTides = () => {
        if (mareaApiStatus == 200) {
            return <p>The tide is currently {risingOrFalling()}. The next {extremes[0].state.toLowerCase()} will be at {format(new Date(extremes[0].datetime), "hh:mm aa")} and the next {extremes[1].state.toLowerCase()} will be at {format(new Date(extremes[1].datetime), "hh:mm aa")}</p>
        }
    }

    const reportingStatus = () => {
        if (mareaApiStatus == 200) {
            console.log(dataSource)
            // console.log(distanceFromSearchMarker)
            // console.log(distanceFromSearchMarker.toFixed(1))
            if (dataSource == "STATION") {
                return <p>The forecasted tide are being returned from a station {distanceFromSearchMarker.toFixed(1)}km from your location.</p>;
            } if (dataSource == "FES2014") {
                return <p>The forecasted tide is being estimated through a tide model</p>
            } else {
                return <p>This situation hasn't been accounted for.</p>
            }
                    
        }
    }

    return (
        <div className='tideInfo-box'>
            <h3>Tide Info</h3>
            <div id='chart'>
                <TideChart/>
            </div>
            <div id='quickForecast'>
                {reportingStatus()}
                {nextTides()}
            </div>
            
            <table>
                <thead>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>TIME</th>
                </thead>
                <tbody>
                    {renderExtremeData()}
                </tbody>
                
            </table>
            
        </div>
    )
}

export default TideInfo