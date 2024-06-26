import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addToWatchlist } from '../store/firebase.services';
import styles from './css/movie.details.module.css'

export default function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movies)

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://www.omdbapi.com/?apikey=480fd1e0&t=${props.movie}`;

      try { 
        const response = await fetch(url);
        const resultStr = await response.text();
        const result = JSON.parse(resultStr);
        setMovieDetails(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.movie, dispatch]);

  
 function handleAddToWatchlist() {
    if (toggle) return;
    const movieObj = { ...movieDetails, inWatchlist: true }

    // add item to the watchlist
    dispatch(addToWatchlist(movieObj))
    setToggle(true);
  }
  
  return (
      <div id={styles.container}>
      <img src={movieDetails.Poster} alt="movie-poster" id={styles.poster} />
      <h3>{movieDetails.Title}</h3>
      <p>{movieDetails.Genre }</p>
      <p>{movieDetails.Runtime }</p>
      <p>{movieDetails.Released }</p>
      <p>{movieDetails.Director }</p>
      <p>{movieDetails.Language}</p>
      <p>{movieDetails.Plot}</p>
      {toggle &&
        <>
        <button onClick={handleAddToWatchlist}><BookmarkIcon />Remove from watchlist</button>
        </>
      }
        {!toggle && <button onClick={handleAddToWatchlist}><BookmarkAddIcon /> Add to watchlist</button>}
        </div>
  )
}