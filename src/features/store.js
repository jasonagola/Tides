import {configureStore} from '@reduxjs/toolkit';

import tideReducer from './tide/tideSlice';
import searchParamsReducer from './searchParams/searchParamsSlice';
import uiControlReducer from './uiControl/uiControlSlice';

const store = configureStore({
    reducer: {
        tide:tideReducer,
        searchParams:searchParamsReducer,
        uiControl:uiControlReducer
    }
})

export default store