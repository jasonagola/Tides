import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'searchParams',
    initialState: {
        searchPosition: {
            lat: 1,
            lng: 0 
        },
        mapCenter: {
            lat: 0,
            lng: 0 
        },
        name: '',
        timestamp: [null],
        duration: 10080, 
        interval: 60
    },
    reducers: {
        updatePosition: (state, action) => {
            const {lat, lng} = action.payload
            // console.log('State Updated')
            return {...state, searchPosition: {lat:lat, lng:lng}
            }
        }, 
        updateName: (state, action) => {
            const name = action.payload
            return {...state, name: name}
        }, 
        updateMapCenter: (state, action) => {
            const newCenter = action.payload
            return {...state, mapCenter: newCenter}
        }
    }
}


export const searchParamsSlice = createSlice(options)
export const { updatePosition, updateName, updateMapCenter } = searchParamsSlice.actions

export default searchParamsSlice.reducer



////////Selector

export const searchParamsPosition = (state) => {
    const position = state.searchParams.searchPosition
    return position
}

export const searchParamsName = (state) => {
    const name = state.searchParams.name
    return name
}

export const searchParamsData = (state) => {
    return state
}

export const mapCenterData = (state) => {
    return state.searchParams.mapCenter
}
