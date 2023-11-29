import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar({fetchCars}) {

    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel:'',
        year: '',
        price: ''

    })
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave= () =>{
    fetch(import.meta.env.VITE_API_URL + '/cars', {
    method: 'POST',
    headers: { 'Content-type':'application/json' }, 
    body: JSON.stringify(car)
    })
    .then(response => {
    if(!response.ok)
    throw new Error('Addition Failed:' + response.statusText)

    fetchCars();
    })
    .catch(err => console.error(err))
    
    handleClose();
  }
  
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
            <TextField
            margin="dense"
            label="Brand"
            value={car.brand}
            onChange={e => setCar({...car, brand:  e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Model"
            value={car.model}
            onChange={e => setCar({...car, model:  e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Color"
            value={car.color}
            onChange={e => setCar({...car, color:  e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Fuel"
            value={car.fuel}
            onChange={e => setCar({...car, fuel:  e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Year"
            value={car.year}
            onChange={e => setCar({...car, year:  e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="price"
            value={car.price}
            onChange={e => setCar({...car, price:  e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}