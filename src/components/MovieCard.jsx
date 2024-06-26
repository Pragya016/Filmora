import React from 'react';
import styles from './css/movie.card.module.css'
import ResponsiveModal from './ResponsiveModal';

export default function MovieCard(props) {
  const { poster, title, duration } = props.movie;

  return (
    <div id={styles.cardContainer}>
      <img src={poster} alt="movie-poster" id={styles.poster} />
      <div id={styles.detailsContainer}>
        <div id={styles.details}>
        <p id={styles.title}>{title}</p>
        <p id={styles.duration}>{ duration }</p>
        </div>
        <ResponsiveModal btnStyle={styles.btn} movie={ title } />
      </div>
    </div>
    );
}
