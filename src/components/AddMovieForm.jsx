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

export default function AddMovieForm(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
      <Button
        variant="contained"
        size="small"
        color='primary'
        onClick={handleClickOpen}
        style={{fontWeight:600, height:'40px',marginTop: '3px'}}
      >
        Add New Movie
      </Button>

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
              fullWidth
              variant="standard"
              aria-required="true"
            />
            <TextField
              required
              margin="dense"
              id="Plot"
              name="Plot"
              label="Description"
              type="text"
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
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="normal"
              id="Released"
              name="Released"
              type="date"
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
