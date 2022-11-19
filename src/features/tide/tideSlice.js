import { createSlice } from '@reduxjs/toolkit';

const options = {
    name: 'tide',
    initialState: {
        reportedLatLng: {
            lat: 0,
            lng: 0
        },
        distanceFromSearchMarker: 12,
        extremes: [],
        heights: []

    },
    reducers: {
        updateTideInfo: (state, action) => {
            const { reportedLatLng, distanceFromSearchMarker, extremes, heights, mareaStatus, source } = action.payload
            return {...state,
                reportedLatLng:reportedLatLng,
                distanceFromSearchMarker:distanceFromSearchMarker,
                extremes: extremes,
                heights: heights,
                mareaApiStatus: mareaStatus,
                source: source
        }
    }
    }
}

export const tideSlice = createSlice(options);
export const { updateTideInfo } = tideSlice.actions


///////////Selectors
export const selectTideExtremes = (state) => {
    return state.tide.extremes
}

export const selectReportingPosition = (state) => {
    const reportedLatLng = state.tide.reportedLatLng
    return reportedLatLng
}

export const selectReportedPositionDistance = (state) => {
    return state.tide.distanceFromSearchMarker
}

export const selectMareaApiStatus = (state) => {
    return state.tide.mareaApiStatus
}

export const selectDataSource = (state) => {
    return state.tide.source
}

export default tideSlice.reducer

