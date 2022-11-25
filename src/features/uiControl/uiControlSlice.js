import { createSlice } from "@reduxjs/toolkit";


const options = {
    name: 'uiControl',
    initialState: {
        tideDropDown: true,

    },
    reducers: {
        toggleTideDropDown: (state, action) => {
            console.log(action.payload + " Is this what you expected?")
            return { 
                ...state,
                tideDropDown: action.payload
            }
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