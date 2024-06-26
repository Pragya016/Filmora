import React, { useEffect, useState } from 'react'
import { movies } from '../movies'
import MovieCard from './MovieCard'
import MovieDetails from './MovieDetails';
import styles from './css/movieList.module.css'
import { useDispatch} from 'react-redux';
import { getMovies } from '../store/firebase.services';

export default function MovieList() {
    const [displayMovieDetails, setDisplayMovieDetails] = useState(false);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

  useEffect(() => {
    // this will display the badge over the bookmarks icon
    dispatch(getMovies());
  },[dispatch])

    function handleDisplayMovieDetails(movieTitle) {
        setTitle(movieTitle);
        setDisplayMovieDetails(true);
    }

  return (
    <div id={styles.container}>
        {movies.map((movie, i) => (
          <MovieCard key={i} movie={movie} onMovieClick={() => handleDisplayMovieDetails(movie.title)}/>
        ))}
      {displayMovieDetails && <MovieDetails movie={title} />}
    </div>
  )
}
