import React, {useState, useEffect} from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import store from './features/store';
import { useSelector } from 'react-redux';
import { searchParamsPosition, updateName, updatePosition, mapCenterData, updateMapCenter } from './features/searchParams/searchParamsSlice';
import { selectReportingPosition, selectMareaApiStatus } from './features/tide/tideSlice';
import { mapClickTideToggle, tideSearchButton} from './uiControlFunctions';


const options = {
    clickableIcons: false,
    // mapId: '4502cdab88b3790',
}
const mapContainerStyle = {
    height: "100%",
    width: '100%'
}


function Map(isLoaded) {



//////Need to redefine marker and reporting position from state:
//define local variable for marker and center using selctor from redux
//add marker for reporting station with reportedLatLng from state, is there an appropriate selector
//dispatch update position for mapClickEvent
///Does center reportiing need to be placed into redux state or is it only a load parameter?
    const reportingStationIcon = './src/resources/bouy.png'

    const searchPosition = useSelector(searchParamsPosition)

    const mapCenter = useSelector(mapCenterData)

    const reportedLatLng = useSelector(selectReportingPosition)
    // console.log(reportedLatLng.lat)
    const mareaApiStatus = useSelector(selectMareaApiStatus)

    const [center, setCenter] = useState({lat: 0, lng: 0})

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(map => {
      mapRef.current = map;
    }, []);


    useEffect(() => { 
        const options = {
            enableHighAccuracy: true,
            timeout: 5000
        }

        function success(pos) {
            const currentLocation = pos.coords
            const position = {lat:currentLocation.latitude, lng:currentLocation.longitude}
            store.dispatch(updateMapCenter(position))
            store.dispatch(updatePosition(position))

        }

        function error(err) {
            console.log('current position not found')
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
        
    }, [])


    const onMapClick = (event) => {
        const tideToggleState = store.getState().uiControl.tideDropDown
        console.log(tideToggleState)
        if (!tideToggleState) {
            // console.log("onMapClick", event)
            const position = ({lat: event.latLng.lat(), lng: event.latLng.lng()})
            store.dispatch(updateMapCenter(position))
            store.dispatch(updatePosition(position))
            store.dispatch(updateName('Map Marker'))
            tideSearchButton()
        }
        mapClickTideToggle()
    }

    const renderReportingPosition = () => {
        if (mareaApiStatus === 200) {
            // console.log(reportedLatLng)
            return 
            // <Marker 
            //     key={reportedLatLng.lat} 
            //     position={{lat:reportedLatLng.lat, lng:reportedLatLng.lng}}
            //     icon={{
            //         url: '/src/resources/radio.svg',
            //         scaledSize: new window.google.maps.Size(30,30),
            //     }} 
            // />
        }
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            mapContainerClassName='map-container'
            zoom={14}
            center={mapCenter}
            options={options}
            onClick={onMapClick}

        > 
            <Marker key={searchPosition.lat} position={searchPosition}/>
            <Marker 
                key={reportedLatLng.lat} 
                position={reportedLatLng}
                icon = {{
                    label: 'Tide Reporting Station',
                    // url: '/src/resources/icons/Buoy.png',
                    scaledSize: new window.google.maps.Size(50, 50)
                }
                }
            />
           
        </GoogleMap>
    )
};

export default Map