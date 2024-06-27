import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { addToWatchlist } from '../store/firebase.services';
import styles from './css/movie.details.module.css';
import { Button } from '@mui/material';

export default function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.movies || []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://www.omdbapi.com/?apikey=480fd1e0&t=${props.movie}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setMovieDetails(result);

        // Check if the movie is in the watchlist
        const movieInWatchlist = watchlist.some(item => item.imdbID === result.imdbID);
        setIsInWatchlist(movieInWatchlist);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.movie, watchlist]);

  function handleAddToWatchlist() {
    if (isInWatchlist) return;
    const movieObj = { ...movieDetails, inWatchlist: true };

    // add item to the watchlist
    dispatch(addToWatchlist(movieObj));
    setIsInWatchlist(true);
  }

  return (
    <div id={styles.container}>
      <img src={movieDetails.Poster} alt="movie-poster" id={styles.poster} />
      <h1 id={styles.title}>{movieDetails.Title}</h1>
      <p id={styles.genre}><span className={styles.headings}>Genre</span> : {movieDetails.Genre}</p>
      <p id={styles.runtime}><span className={styles.headings}>Duration</span> : {movieDetails.Runtime}</p>
      <p id={styles.released}><span className={styles.headings}>Released on</span> : {movieDetails.Released}</p>
      <p id={styles.director}><span className={styles.headings}>Director</span> : {movieDetails.Director}</p>
      <p id={styles.language}><span className={styles.headings}>Language</span> : {movieDetails.Language}</p>
      <p id={styles.plot}>{movieDetails.Plot}</p>
      <Button className={styles.btn} variant='outlined' color='primary' style={{ marginLeft: '5px' }} onClick={() => props.onClose()}>Close</Button>
      {isInWatchlist ? (
        <Button id={styles.addedBtn} className={styles.btn} variant='contained' color='warning'>
          <LibraryAddCheckIcon style={{ marginRight: '5px' }} />Added
        </Button>
      ) : (
        <Button className={styles.btn} variant='outlined' color='warning' onClick={handleAddToWatchlist}>
          <BookmarkAddIcon /> Add to watchlist
        </Button>
      )}
    </div>
  );
}
