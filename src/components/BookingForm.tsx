import React,{ReactEventHandler, useState} from 'react';
import { Grid, makeStyles, TextField, Button, Card, CardContent, Typography, TextFieldProps } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import './styles/select.css';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((Theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}));


const BookingForm = () => {

  type BookingsProps = {
    name: string
    phoneNo: string
    members: number
    reservationTime: TimerHandler
  }
  
  const [name,setName]=useState<string>('');
  const [phoneNo,setPhoneNo]=useState<string>('');
  const [members,setMembers]=useState<number>(0);
  const [reservationTime,setReservationTime]=useState<TimerHandler>('');
  const [bookingStatus,setBookingStatus]=useState<string>('Enter details to book table.');      
  const membersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if(value=='1') setMembers(1);
    if(value=='2') setMembers(2);
    if(value=='3') setMembers(3);
    if(value=='4') setMembers(4);
  }

  const classes = useStyles();
  const [open,setOpen]=React.useState(false);
  const handleClickToOpen = () => {
    if(phoneNo.length==10) setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
    setBookingStatus("Enter details to book table.");
  };

  const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        var target = event.target as typeof event.target & {
          name : {value : string};
          phoneNo: {value: string};
          members: {value: number};
          reservationTime: {value: TimerHandler};
        };

        let new_booking:BookingsProps = {
          name: target.name.value,
          phoneNo: target.phoneNo.value,
          members: target.members.value,
          reservationTime: target.reservationTime.value
        }

        await axios.post(`restaurant/Bookings/Book-For`,new_booking,{
          headers: {
          "content-type": "application/json"
        }, 
        })
          .then((response) => {
            setBookingStatus(response.data);  
            setName('');
            setPhoneNo('');
            setMembers(0);
            setReservationTime('');
          }, (error) => {
            setBookingStatus(error.response.data);
            setName('');
            setPhoneNo('');
            setMembers(0);
            setReservationTime('');      
            console.log(error);
  });

}
    return (
      <div className="App"> 
        <Grid>
          <Card style={{ maxWidth: 450,  padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Table Booking
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Fill up the form and we will notify you if the table is available.
            </Typography> 
              <form onSubmit={(e)=> handleSubmit(e)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField name="name" onChange={event => setName(event.target.value)} value={name} placeholder="Enter full name" label="Name" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} placeholder="Enter phone number" label="Phone number" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                  <select name="members" value={members} onChange={membersChange} placeholder='Members' className='select-dropdown'>
                    <option value='0' selected disabled>
                      Choose Members
                    </option> 
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </select>
                  </Grid>
                    <Grid item xs={12}>
                    <TextField name="reservationTime" type="time" onChange={event => setReservationTime(event.target.value)} value={reservationTime} placeholder="Enter reservation time" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained"  onClick={handleClickToOpen} color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </form>
              <Dialog
                fullWidth
                open={open}
                onClose={handleToClose}
                maxWidth="xs"
                BackdropProps={{
                  classes: {
                    root: classes.backDrop,
                  },
                }} >
          <DialogTitle>{"Notification!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {bookingStatus}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose} 
                    color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

            </CardContent>
          </Card>
        </Grid>
      </div>
    );
}

export default BookingForm;