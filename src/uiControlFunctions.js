import store from './features/store';
import { toggleTideDropDown } from './features/uiControl/uiControlSlice';
import gsap from 'gsap';

var transitionTimeline = gsap.timeline({pausued: true});
transitionTimeline.to("#App-Map", {duration: .5, height: '20vh'});
transitionTimeline.to("#App-Info", {duration: .5, height: '60vh'},"<");
transitionTimeline.reversed(true)

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


const animateTransition = () => {
    console.log('Toggled!!!!!')
    const toggleState = store.getState().uiControl.tideDropDown
    toggleState ? transitionTimeline.play():transitionTimeline.reverse()

}

function toggleCollapse() { 
    store.dispatch(toggleTideDropDown());
    console.log(store.getState().uiControl.tideDropDown)
}
    

export { animateTransition, mapClickTideToggle, tideSearchButton, toggleCollapse }