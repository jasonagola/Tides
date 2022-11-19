import React from 'react';
import { useSelector } from 'react-redux';
import { selectTideExtremes } from './features/tide/tideSlice';
import TideChart from './tideChart';

function TideChartDisplay() {
    const extremes = useSelector(selectTideExtremes)
    if (extremes.length !== 0) {
        return <TideChart/>
    }
    return <div></div>
}

export default TideChartDisplay