import React from 'react';
import { useDispatch } from 'react-redux';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckIcon from '@mui/icons-material/Check';
import { removeFromWatchlist, toggleMarkAsWatched } from '../store/firebase.services';
import styles from './css/watchlist.card.module.css';
import { Button } from '@mui/material';
import EditMovieForm from './EditMovieForm';

export default function WatchlistCard(props) {
  const { Poster, Title, Released, id, Plot, Genre, isWatched, inWatchlist } = props.watchlistItem;
  const dispatch = useDispatch();

  function handleRemoveFromWatchlist() {
    const confirmation = window.confirm('Delete this movie from watchlist?');
    if (!confirmation) return;

    dispatch(removeFromWatchlist({id}));
  }

  function handleMarkedAsWatched() {
    dispatch(toggleMarkAsWatched(id));
  }

  return (
    <div id={styles.cardContainer}>
      <img src={Poster} alt="" id={styles.poster} />
      <div id={styles.detailsContainer}>
        <div id={styles.topContainer}>
          <div id={styles.details}>
            <p id={styles.title}>{Title}</p>
            <p id={styles.genre}>{Genre}</p>
            <p id={styles.released}>{Released}</p>
          </div>
          <IconButton id={styles.editIcon} aria-label="edit">
            <EditMovieForm movieData={props.watchlistItem} />
          </IconButton>
        </div>
        <div id={styles.desc}>
          <p id={styles.text}>{Plot}</p>
        </div>
        <div id={styles.bottomContainer}>
          <Button variant='contained' onClick={handleRemoveFromWatchlist} style={{ marginRight: "5px", background: '#F9BB01', color: 'darkslategrey' }}>
            <BookmarkRemoveIcon style={{ marginRight: "5px" }} />Remove
          </Button>
          {isWatched ? (
            <Button variant='contained' color='primary' onClick={handleMarkedAsWatched}>
              <CheckIcon style={{ marginRight: "5px" }} />Watched
            </Button>
          ) : (
            <Button variant='outlined' onClick={handleMarkedAsWatched}>
              <RemoveRedEyeIcon style={{ marginRight: "5px" }} /> Mark as watched
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
