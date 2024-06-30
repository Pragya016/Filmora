import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { addToWatchlist, toggleMarkAsWatched } from '../store/firebase.services';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import styles from './css/movie.details.module.css';

export default function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchedMovie, setWatchedMovie] = useState({ watched: false, id: null });
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.movies || []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.omdbapi.com/?apikey=480fd1e0&t=${props.movie}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setMovieDetails(result);

        // Check if the movie is in the watchlist and get its ID
        const movieInWatchlist = watchlist.find(item => item.imdbID === result.imdbID);
        const movieId = movieInWatchlist ? movieInWatchlist.id : null;
        setIsInWatchlist(!!movieInWatchlist);
        setWatchedMovie({ watched: !!movieInWatchlist, id: movieId });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.movie, watchlist]);

  // -------------------------------
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
      <div id={styles.btnContainer}>
        <div>
          {isInWatchlist ? (
            <Button variant='contained' color='warning' style={{ marginRight: '5px', float : 'right', color : 'darkslategray', background: '#F9BB02' ,border: '1px solid #F9BB02'}}>
              <LibraryAddCheckIcon style={{ marginRight: '5px' }} />Added
            </Button>
          ) : (
            <Button variant='outlined' onClick={handleAddToWatchlist} style={{ marginRight: '5px', float : 'right', color : '#F9BB02', border: '1px solid #F9BB02'}}>
              <BookmarkAddIcon /> Add to watchlist
            </Button>
          )}
            {/* {watchedMovie.watched && <Button variant='contained' color='primary'><CheckIcon style={{ marginRight: "5px" }} />Watched</Button>} */}
        </div>
        <Button variant='outlined' color='primary' onClick={() => props.onClose()}>Close</Button>
      </div>
    </div>
  );
}
