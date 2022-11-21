import './App.css';
import React from 'react';
import { useSelector } from 'react-redux'
import SearchBox from './searchBox';
import MapDisplay from './MapDisplay'
import TideInfo from './tideInfo';
import SmoothCollapse from 'react-smooth-collapse';
import TideChart from './tideChart'
import {toggleCollapse} from './uiControlFunctions';
import {selectTideDropDown} from './features/uiControl/uiControlSlice'
import { useLoadScript } from '@react-google-maps/api';

const placesLibrary = ['places'];

function App() {

  const collapseState = useSelector(selectTideDropDown)

  const { isLoaded } =  useLoadScript({
    googleMapsApiKey: 'AIzaSyBQnIibtFD3AoPrOtF6MW_18I2vYlEgdW0',
    libraries: placesLibrary
});

if(!isLoaded) {
  return <div>Loading...</div>
  };

  return (
    <div className="App">
      <div className="App-header">
      <h1>Local Tide Information</h1>
        <SearchBox/>
        <button onClick={()=>toggleCollapse()}></button>
      </div>

      <div className="App-body">
        <SmoothCollapse expanded={collapseState} collapsedHeight={0}>
      
          <div className="App-Info">
            <TideChart/>
            <TideInfo/> 
          </div> 
        </SmoothCollapse>
    
        
        <div className="App-map">
          <MapDisplay isLoaded={isLoaded}/>
        </div>
      </div>
    </div>
  );
}

export default App;
