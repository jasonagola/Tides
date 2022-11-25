import axios from 'axios';
import store from './features/store';
import { updateTideInfo } from './features/tide/tideSlice';
import { toggleTideDropDown } from './features/uiControl/uiControlSlice';



async function getTides() {
    const storeData = store.getState()
    const url = 'https://vq0jfuw073.execute-api.us-east-1.amazonaws.com/getMareaTideDeployment/'
    const options = {
        method: 'GET',
        params: {
            duration: storeData.searchParams.duration,
            interval: storeData.searchParams.interval,
            latitude: storeData.searchParams.searchPosition.lat,
            longitude: storeData.searchParams.searchPosition.lng,
            station_radius: 10
        }
    }


    axios.get(url, options)
        .then((response) => {
            console.log(response)
            parseTideGet(response)
        })
    }


function parseTideGet(response) {
    // console.log(response)
    // console.log(response.data.origin.heights)
    const tideInfo = {
        extremes: response.data.extremes,
        reportedLatLng: {
            lat: response.data.origin.latitude,
            lng: response.data.origin.longitude
        },
        distanceFromSearchMarker: response.data.origin.distance,
        heights: response.data.heights,
        mareaStatus: response.status,
        source: response.data.source

    }
    
    store.dispatch(updateTideInfo(tideInfo))
    const tideToggle = store.getState().uiControl.tideDropDown
    // console.log(tideToggle)
    if (tideToggle === true) {
        store.dispatch(toggleTideDropDown(false))

    }
    }

export default getTides