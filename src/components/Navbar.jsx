import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useSelector } from 'react-redux';
import { watchlistContext } from '../App';
import AddMovieForm from './AddMovieForm';
import styles from './css/navbar.module.css'

export default function Navbar() {
  const watchlistItems = useSelector(state => state.movies);
  const { setShowWatchlist } = useContext(watchlistContext);

  function handleDisplayWatchlist() {
    setShowWatchlist(prevState => !prevState);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id={styles.nav}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <span id={styles.logoText}>
             <LiveTvIcon style={{position :'relative', top : '2px'}}/> Filmora
            </span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <AddMovieForm />
            <IconButton size="large" color="inherit" onClick={handleDisplayWatchlist}>
              <Badge badgeContent={watchlistItems.length} color="primary">
                <BookmarksIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
