import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

// Create movies collection reference using the imported db instance
const moviesCollection = collection(db, 'movies');

export const addToWatchlist = createAsyncThunk(
    'movies/addToWatchlist',
    async (movie, thunkAPI) => {
        try {
            // Check if a movie with the same title already exists
            const movieRef = doc(moviesCollection, movie.Title);
            const docSnapshot = await getDoc(movieRef);

            if (docSnapshot.exists()) {
                console.log('Movie with title already exists in the database.');
                // If exists, return without adding
                return movie;
            }

            // If the movie doesn't exist, add it to the database
            await setDoc(movieRef, movie);
            return movie ;
        } catch (error) {
            console.error('Error adding movie to watchlist', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getMovies = createAsyncThunk('movies/getMovies', async (_, thunkAPI) => {
    try {
        // Fetch all documents from the 'movies' collection
        const querySnapshot = await getDocs(moviesCollection);

        // Extract data from each document
        const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return movies;
    } catch (error) {
        console.log('Something went wrong:', error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const removeFromWatchlist = createAsyncThunk('movies/removeFromWatchlist', async (id, thunkAPI) => {
    try {
        const docRef = doc(moviesCollection, id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const updateMovieDetails = createAsyncThunk('movies/updateMovieDetails', async ({data}, thunkAPI) => {
    const { id, ...movieDetails } = data;
    try {
        const docRef = doc(moviesCollection, id);
        await updateDoc(docRef, movieDetails);
        return { id, movieDetails };
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});


export const getMovieByName = createAsyncThunk('movies/getMovieByName', async (title, thunkAPI) => {
    const OMDB_API_KEY = '480fd1e0';
    const OMDB_API_URL = 'http://www.omdbapi.com/';
    try {
        // Check Firestore for the movie
        const docRef = doc(moviesCollection, title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const movie = docSnap.data();
            console.log(movie);
            return movie;
        } else {
            // Movie not found in Firestore, fetch from OMDB API
            const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${title}`);
            if (!response.ok) {
                throw new Error('Failed to fetch from OMDB API');
            }
            const movie = await response.json();

            if (movie.Response === 'False') {
                return thunkAPI.rejectWithValue({ error: movie.Error });
            }

            console.log(movie)
            return movie;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});