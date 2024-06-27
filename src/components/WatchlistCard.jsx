import React, { useState } from 'react';
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
  const { Poster, Title, Released, id, Plot, Genre, isWatched } = props.watchlistItem;
  let { inWatchlist } = props.watchlistItem;
  const dispatch = useDispatch();
  console.log(isWatched)

  function handleRemoveFromWatchlist() {
    const confirmation = window.confirm('Delete this movie from watchlist?');
    if (!confirmation) return;
    inWatchlist = false;
    dispatch(removeFromWatchlist(id));
  }

  function handleMarkedAsWatched() {
    dispatch(toggleMarkAsWatched(id))
  }

  return (
    <>
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
              <EditMovieForm movieData={ props.watchlistItem } />
            </IconButton>
          </div>
          <div id={styles.desc}>
            <p id={styles.text}>{Plot}</p>
          </div>
          <div id={styles.bottomContainer}>
            <Button variant='contained' color='warning' onClick={handleRemoveFromWatchlist} style={{marginRight : "5px"}}><BookmarkRemoveIcon style={{marginRight : "5px"}} />Remove</Button>
            {isWatched && <Button variant='contained' color='success' onClick={handleMarkedAsWatched}><CheckIcon style={{marginRight : "5px"}} />Watched</Button>}
            {!isWatched &&  <Button variant='outlined' color='warning' onClick={handleMarkedAsWatched}><RemoveRedEyeIcon style={{marginRight : "5px"}}/> Mark as watched</Button>}
          </div>
        </div>
      </div>
    </>
  );
}
