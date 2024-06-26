import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { removeFromWatchlist } from '../store/firebase.services';
import styles from './css/watchlist.card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import EditMovieForm from './EditMovieForm';

export default function WatchlistCard(props) {
  const { Poster, Title, Released, id, Plot, Genre } = props.watchlistItem;
  console.log()
  let { inWatchlist } = props.watchlistItem;
  const dispatch = useDispatch();

  function handleRemoveFromWatchlist() {
    const confirmation = window.confirm('Delete this movie from watchlist?');
    if (!confirmation) return;
    inWatchlist = false;
    dispatch(removeFromWatchlist(id));
  }

  function handleMarkedAsWatched() {

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
            <p id={styles.desc}>{Plot}</p>
          <div id={styles.bottomContainer}>
            <Button variant='contained' color='warning' onClick={handleRemoveFromWatchlist} style={{marginRight : "5px"}}><BookmarkRemoveIcon />Remove</Button>
            <Button variant='outlined' color='warning' onClick={handleMarkedAsWatched}><RemoveRedEyeIcon style={{marginRight : "5px"}}/> Mark as watched</Button>
          </div>
        </div>
      </div>
    </>
  );
}
