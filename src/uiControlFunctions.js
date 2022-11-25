import store from './features/store';
import { toggleTideDropDown } from './features/uiControl/uiControlSlice';


const mapClickTideToggle = () => {
    const tideToggleState = store.getState().uiControl.tideDropDown
    console.log(tideToggleState + 'map click state')
    if (tideToggleState === false) {
        store.dispatch(toggleTideDropDown(!tideToggleState))
    }
}

const tideInfoToggle = () => {
    const tideToggleState = store.getState().uiControl.tideDropDown;
    const mareaApiStatus = store.getState().tide.mareaApiStatus
    console.log("I should've clicked this")
    if (tideToggleState && mareaApiStatus === true) {
        store.dispatch(toggleTideDropDown(false))
    }
}

const tideSearchButton = () => {
    const searchedName = store.getState().searchParams.name
    const searchButton = document.getElementById('retrieveTide')
    const searchInput = document.getElementById('searchInput')
    switch (searchedName) {
        case ('Map Marker'):
            searchButton.innerHTML = 'Retrieve Tide Data for ' + searchedName
            searchInput.value = "";
        default: 
        searchButton.innerHTML = 'Retrieve Tide Data for ' + searchedName
        
    }
}


function toggleCollapse() { 
    const tideToggleState = store.getState().uiControl.tideDropDown
    store.dispatch(toggleTideDropDown(!tideToggleState));
}
    

export { tideInfoToggle, mapClickTideToggle, tideSearchButton, toggleCollapse }