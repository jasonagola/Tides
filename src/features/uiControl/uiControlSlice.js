import { createSlice } from "@reduxjs/toolkit";


const options = {
    name: 'uiControl',
    initialState: {
        tideDropDown: false,

    },
    reducers: {
        toggleTideDropDown: (state) => {
            state.tideDropDown = !state.tideDropDown
        }
    }
}


export const uiControl = createSlice(options)
export const {toggleTideDropDown} = uiControl.actions

// ////////////Selectors
export const selectTideDropDown =  (state) => {
    return state.uiControl.tideDropDown
}

export default uiControl.reducer