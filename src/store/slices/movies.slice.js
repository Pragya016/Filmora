import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist, getMovieByName, getMovies, removeFromWatchlist, updateMovieDetails } from "../firebase.services";

const watchlistSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToWatchlist.fulfilled, (state, action) => {
            // Check if movie was added 
            const existingIndex = state.findIndex(movie => movie.id === action.payload.id);
            if (existingIndex === -1) {
                return [...state, action.payload];
            }
        });

        builder.addCase(getMovies.fulfilled, (state, action) => {
            return action.payload;
        })

        .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        return state.filter(movie => movie.id !== action.payload);
        })

        .addCase(updateMovieDetails.fulfilled, (state, action) => {
            const { id, movieDetails } = action.payload;
            return state.map(movie =>
                movie.id === id ? { ...movie, ...movieDetails } : movie
            );
        })
            
        .addCase(getMovieByName.fulfilled, (state, action) => {
            return action.payload;
        })

    }
})

export default watchlistSlice.reducer;
