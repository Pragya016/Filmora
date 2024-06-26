import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import movieReducer from "./slices/movies.slice.js";

const movieStore = configureStore({
    reducer: {
        movies: movieReducer,   
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default movieStore;