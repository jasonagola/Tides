import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, XAxis, YAxis, Area, Tooltip, CartesianGrid, AreaChart } from 'recharts';
import { selectTideExtremes } from './features/tide/tideSlice';
import {format, parseISO } from 'date-fns';
import store from './features/store';


function TideChart() {
    const extremes = useSelector(selectTideExtremes)
    console.log("This is the status of extremes:"+ extremes)

    const data = []

    const tideExtremesParsingTool = () => {
        extremes.map((extreme => {
            const date = new Date(extreme.datetime)
            data.push({
                date: date.toISOString(),
                // date: date,
                value: extreme.height,
                status: extreme.state
            })
        }))
        
    }

    // const dateLabelTool = () => {
    //     const dateOnly = datetimesArray.map((date) => date.toISOString().substr(0,10));
    //     let testDate = [];
    //     for (let i =0;i<=dateOnly.length;i++) {
    //         if (dateOnly[i] != testDate) {
    //             dateLabels.push(datetimesArray[i])
    //             testDate = dateOnly[i]
    //         }
    //     }
    // }

    tideExtremesParsingTool()

    if (store.getState().tide.mareaApiStatus === 200) {
        return (
            <div>
            {console.log("Chart Render")}
            
            <ResponsiveContainer width='100%' height={200}>
                <AreaChart data={data}>
                        <Area type="monotone" label='true' dataKey='value' stroke='#2451B7' fillColor="url(#color)" fontSize={10}/>
                        <XAxis 
                            dataKey='date' 
                            tickFormatter={(date)=> {
                                // return parseISO(date)
                                // const dateDataPoint = new Date (parseISO(date));
                                // return dateDataPoint
                                return format(parseISO(date), "MMM-dd")
                                }}
                            allowDuplicatedCataeogry='false'
                            style={{fontSize:'10'}}
                        />
                        <YAxis dataKey='value' axisLine={false} tickLine={false} tickCount={10} style={{fontSize:'10'}}/>
                        <Tooltip content={<CustomToolTip/>} viewBox={{ x: 0, y: 0, width: 400, height: 400 }}/>
                        <CartesianGrid opacity={0.1} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
            </div>
        ) 
    } else {
        return (
            <div>
                <p>Tide Chart</p>
            </div>
        )
    }
}

function CustomToolTip({active, payload, label}) {
    if (active) {
        return <div className='tooltip'>
            <p>{format(parseISO(label), "hh:mm aa")}</p>
            <p style={{fontSize:'1rem'}}>{format(parseISO(label),"eeee, MMM d")}</p>
        </div>
    }

}

export default TideChart;