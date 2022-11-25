import { Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import store from './features/store';
import getTides from './gatewayProxy';

//Local Backend
// import getTides from './Marea';


import {searchParamsPosition, updateName, updatePosition } from './features/searchParams/searchParamsSlice'
import { updateMapCenter } from './features/searchParams/searchParamsSlice';
import "./searchBox.css";
import { tideSearchButton } from './uiControlFunctions';
import { useSelector } from 'react-redux';
import { toggleTideDropDown } from './features/uiControl/uiControlSlice';


function SearchBox() {
    const searchedMarkerPosition = useSelector(searchParamsPosition)
    const [forecastLength, setForecastLength] = useState('1');
    const [searchResult, setSearchResult] = useState('')

    // const [latitude, setLatitude] = useState(null);
    // const [longitutde, setLongitude] = useState(null);


    // const getRandomLatitude = () => {
    //     return Math.random() * (90 - (-90)) + (-90);
    // };

    // const getRandomLongitude = () => {
    //     return Math.random() * (180 - (-180)) + (-180);
    // };

    // const handleClick = () => {
    //     setLatitude(getRandomLatitude())
    //     setLongitude(getRandomLongitude())
    // }
 

    async function handleSearch() {
        await getTides()
        //Local Backend
        //getTides()
        //
        store.dispatch(updateMapCenter(searchedMarkerPosition))
    
        
    }

    const displayForecastLengthValue = (e) => {
        setForecastLength(e.target.value)
    };


    const onLoad = (autocomplete) => {
        setSearchResult(autocomplete)
    }

    const onPlaceChanged = () => {
        if (searchResult != null) {
            const place = searchResult.getPlace()
            console.log(place)
            const searchLocation = place.geometry.location
            const searchLatLng = {
                lat: searchLocation.lat(),
                lng: searchLocation.lng()
            }
            // console.log(searchLatLng)
            store.dispatch(updatePosition(searchLatLng))
            store.dispatch(updateName(place.name))
            tideSearchButton()
        }
    }
    const autocompleteOptions = {
        fields: ['name', 'geometry']
    }

    return (
        <div id="searchColumn">
            <h2>Tide Forecast Options</h2>
            <Autocomplete async defer
            onPlaceChanged={onPlaceChanged}
            onLoad = {onLoad}
            options = {autocompleteOptions}>
        

                <input
                type="text"
                id='searchInput'
                placeholder="Location Search"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `50%`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
                />
            </Autocomplete>
    

            
            <form>
                
                {/* <label htmlFor="searchDate">Select Forecast Date:</label>
                <input id="searchDate" type='date'/> */}

                {/* <label>Forecast Length: {forecastLength} </label>
                <input onChange={displayForecastLengthValue} type="range" min='1' max="7" id="forecastLength"></input>
                <p>Default is 1 day.  Maximum 7 days per forecast</p> */}
                <button id='retrieveTide' type="button" onClick={() => {handleSearch()}}>Retrieve Tide Data For Your Location</button>
            </form>
            {/* <h2>Want To Explore?</h2>
            <p>Click the button below to get a random location around the world.  (Reminder: Landlocked locations will not have an appropriate tide forecast.)</p>
            <button onClick={() => {handleClick()}}>Get Random Location</button>
            <p>Latitude:{latitude}, Longitude:{longitutde}</p> */}
        </div>
    )
}

export default SearchBox