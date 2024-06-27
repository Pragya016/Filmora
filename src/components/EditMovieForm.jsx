import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { editMovie } from '../store/firebase.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const isoDateString = date.toISOString().split('T')[0];
  return isoDateString;
};

export default function EditMovieForm(props) {
  const [movieData, setMovieData] = React.useState({
    id: '',
    Title: '',
    Plot: '',
    Released: '',
    Genre: '',
    Poster: ''
  });
  const date = movieData?.Released && formatDate(movieData.Released);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.movieData) {
      const movie = props.movieData;
      setMovieData({
        id: movie.id,
        Title: movie.Title,
        Plot: movie.Plot,
        Released: formatDate(movie.Released),
        Genre: movie.Genre,
        Poster: movie.Poster
      });
    }

  }, [props.movieData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditMovie = (event) => {
    event.preventDefault();
    console.log(movieData);
    if (movieData.id) {
      dispatch(editMovie(movieData));
      handleClose();
    } else {
      console.error('Movie ID is missing.');
    }
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faEdit} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleEditMovie}>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the movie.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Title"
              name="Title"
              label="Title"
              type="text"
              value={movieData.Title}
              onChange={handleChange}
              fullWidth
              variant="standard"
              aria-required="true"
            />
            <TextField
              required
              margin="dense"
              id="Plot"
              name="Plot"
              label="Plot"
              type="text"
              value={movieData.Plot}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="Genre"
              name="Genre"
              label="Genre"
              type="text"
              value={movieData.Genre}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="normal"
              id="Released"
              name="Released"
              type="date"
              value={date}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="normal"
              id="Poster"
              name="Poster"
              label="Poster URL"
              type="url"
              value={movieData.Poster}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
