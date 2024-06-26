import React, { useContext } from 'react'
import { watchlistContext } from '../App'
import Navbar from './Navbar';
import Watchlist from './Watchlist';

export default function Header() {
    const {showWatchlist} = useContext(watchlistContext);
  return (
    <>
      <Navbar />
      {showWatchlist && <Watchlist/>}
    </>
  )
}
