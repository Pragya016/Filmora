import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { addToWatchlist } from '../store/firebase.services';
import styles from './css/movie.details.module.css'
import { Button } from '@mui/material';

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
      <h1 id={styles.title}>{movieDetails.Title}</h1>
      <p id={styles.genre}><span className={styles.headings}>Genre</span> : {movieDetails.Genre }</p>
      <p id={styles.runtime}><span className={styles.headings}>Duration</span> : {movieDetails.Runtime }</p>
      <p id={styles.released}><span className={styles.headings}>Released on</span> : {movieDetails.Released }</p>
      <p id={styles.director}><span className={styles.headings}>Director</span> : {movieDetails.Director }</p>
      <p id={styles.language}><span className={styles.headings}>Language</span> : {movieDetails.Language}</p>
      <p id={styles.plot}>{movieDetails.Plot}</p>
      <Button className={styles.btn} variant='outlined' color='primary' style={{ marginLeft:'5px'}} onClick={() => props.onClose()}>Close</Button>
      {toggle &&
        <>
        <Button id={styles.addedBtn} className={styles.btn} variant='contained' color='warning' onClick={handleAddToWatchlist}><LibraryAddCheckIcon style={{marginRight : '5px'}} />added</Button>
        </>
      }
        {!toggle && <Button className={styles.btn} variant='outlined' color='warning' onClick={handleAddToWatchlist}><BookmarkAddIcon /> Add to watchlist</Button>}
        </div>
  )
}