import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

// Create movies collection reference using the imported db instance
const moviesCollection = collection(db, 'movies');

export const addToWatchlist = createAsyncThunk(
    'movies/addToWatchlist',
    async (movie, thunkAPI) => {
        try {
            const moviesCollection = collection(db, 'movies');
            const querySnapshot = await getDocs(moviesCollection);

            querySnapshot.forEach((doc) => {
                if (doc.data().id === movie.id) {
                    return movie;
                }
            });

            await addDoc(moviesCollection, movie);
            return movie;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getMovies = createAsyncThunk('movies/getMovies', async (_, thunkAPI) => {
    try {
        const querySnapshot = await getDocs(moviesCollection);
        const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return movies;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const removeFromWatchlist = createAsyncThunk('movies/removeFromWatchlist', async ({id}, thunkAPI) => {
    try {
        const docRef = doc(moviesCollection, id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.log(error)
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
            const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${title}`);

            if (!response.ok) {
                console.log('Failed to fetch from OMDB API');
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

export const editMovie = createAsyncThunk('movies/editMovie', async (movie, thunkAPI) => {
    try {
        if (!movie.id) {
            console.log('Movie ID is missing.');
        }

        const formattedReleasedDate = new Date(movie.Released).toISOString().split('T')[0];
        const movieRef = doc(db, 'movies', movie.id);

        await updateDoc(movieRef, {
            Title: movie.Title,
            Plot: movie.Plot,
            Genre: movie.Genre,
            Released: formattedReleasedDate,
            Poster: movie.Poster,
        });

        return movie;
    } catch (error) {
        console.error("Error updating movie:", error);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});



export const toggleMarkAsWatched = createAsyncThunk(
    'movies/toggleMarkAsWatched',
    async (id, thunkAPI) => {
        try {
            const docRef = doc(db, 'movies', id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const movieData = docSnapshot.data();
                const updatedData = {
                    ...movieData,
                    isWatched: !movieData.isWatched || false, 
                };

                await setDoc(docRef, updatedData, { merge: true });
                return { id, updatedData }; 
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error toggling watched status:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
