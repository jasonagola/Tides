import store from './features/store';
import { toggleTideDropDown } from './features/uiControl/uiControlSlice';



const mapClickTideToggle = () => {
    const tideToggleState = store.getState().uiControl.tideDropDown
    if (tideToggleState === true) {
        store.dispatch(toggleTideDropDown())
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

const toggleCollapse = () => {
    store.dispatch(toggleTideDropDown())
  };



export { mapClickTideToggle, tideSearchButton, toggleCollapse }