import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WatchlistCard from './WatchlistCard';
import { getMovies } from '../store/firebase.services';
import styles from './css/watchlist.module.css';
import { watchlistContext } from '../App';

export default function Watchlist() {
  const bookmarkItems = useSelector((state) => state.movies);
  const { setShowWatchlist } = useContext(watchlistContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
    
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dispatch]);

  function stopPropagation(e){
    e.stopPropagation();
  };

  return (
    <div id={styles.backdropContainer} onClick={() => setShowWatchlist(false)}>
      <div id={styles.container} onClick={stopPropagation}>
        {bookmarkItems && bookmarkItems.length > 0 && bookmarkItems.map((item, i) => (
          <WatchlistCard key={i} watchlistItem={item} />
        ))}
        {bookmarkItems.length <= 0 && <h2 id={styles.warning}>No item found in the watchlist.</h2>}
      </div>
    </div>
  );
}
