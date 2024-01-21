import authReducer from "./slice/AuthSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducers= combineReducers({
    auth: authReducer,
   
})

const store= configureStore({
    reducer: rootReducers
})

export default store
