import { configureStore } from "@reduxjs/toolkit";
import jobPosting  from "../features/jobDetails";



export const store = configureStore({
    reducer:{
        app:jobPosting
    }
})