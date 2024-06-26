import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../store/firebase.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const isoDateString = date.toISOString().split('T')[0];
  return isoDateString;
};

export default function EditMovieForm(props) {
    const [movieData, setMovieData] = React.useState({});
    const date = movieData?.Released && formatDate(movieData.Released);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

  React.useEffect(() => {
    setMovieData(props.movieData)
  }, [props])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMovie = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    dispatch(addToWatchlist(formJson));
    console.log(formJson);
    handleClose();
  };

  return (
    <React.Fragment>
        <FontAwesomeIcon icon={faEdit} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleAddMovie}>
          <DialogTitle>Add a new movie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the new movie.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Title"
              name="Title"
              label="Title"
              type="text"
              value={movieData?.Title}
              fullWidth
              variant="standard"
              aria-required="true"
            />
            <TextField
              required
              margin="dense"
              id="Description"
              name="Description"
              label="Description"
              type="text"
              value={movieData?.Plot}
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
              value={movieData?.Genre}
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
              value={movieData?.Poster}
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
