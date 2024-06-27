import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist, editMovie, getMovieByName, getMovies, removeFromWatchlist, toggleMarkAsWatched } from "../firebase.services";

const watchlistSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToWatchlist.fulfilled, (state, action) => {
            const existingIndex = state.findIndex(movie => movie.id === action.payload.id);
            console.log(existingIndex)
            if (existingIndex === -1) {
                return [...state, action.payload];
            } else {
                return state
            }
        });

        builder.addCase(getMovies.fulfilled, (state, action) => {
            return action.payload;
        })

        builder.addCase(removeFromWatchlist.fulfilled, (state, action) => {
        return state.filter(movie => movie.id !== action.payload);
        })
            
        builder.addCase(getMovieByName.fulfilled, (state, action) => {
            return action.payload;
        })

        builder.addCase(editMovie.fulfilled, (state, action) => {
            const updatedMovie = action.payload;
            console.log(updatedMovie)
            return state.map((movie) =>
                movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
            );
        });

        builder.addCase(toggleMarkAsWatched.fulfilled, (state, action) => {
            return state.map(movie =>
                movie.id === action.payload.id ? { ...movie, isWatched: action.payload.updatedData.isWatched } : movie
            );
        });
    }
})

export default watchlistSlice.reducer;
