import React,{useState} from 'react';
import {Theme,makeStyles, Grid, TextField, Button, Card, CardContent, Typography, Select, InputLabel } from '@material-ui/core';
import axios from 'axios';
import './styles/select.css';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps,AlertColor} from '@mui/material/Alert';

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(165, 42, 42)"
    },
    secondary: {
      main: 'rgb(245, 222, 179)'
    }
  }
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const UpdateBookingForm = () => {

  const [phoneNo,setPhoneNo]=useState<string>('');
  const [members,setMembers]=useState<number>(0);
  const [reservationTime,setReservationTime]=useState<TimerHandler>('');
  const [updationStatus,setUpdationStatus]=useState<string>('Enter details to Update.');
    
  const membersChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const value = event.target.value;
    if(value=='1') setMembers(1);
    if(value=='2') setMembers(2);
    if(value=='3') setMembers(3);
    if(value=='4') setMembers(4);    
  }

      const [open,setOpen]=React.useState(false);
      const [severity,setSeverity]=useState<AlertColor | undefined>(undefined);
      const handleClickToOpen = () => {
        if(phoneNo.length==10) setOpen(true);
      };
      const handleToClose = () => {
        setOpen(false);
        setUpdationStatus("Enter details to update booking");
      };
             
    const handleSubmit = async(event: React.FormEvent) => {
             event.preventDefault();

             var target = event.target as typeof event.target & {
                name : {value : string};
                phoneNo: {value: string};
                members: {value: number};
                reservationTime: {value: TimerHandler};
              };
      

             const phoneNo= target.phoneNo.value;
             const members= target.members.value;
             const reservationTime = target.reservationTime.value;
                    
            await axios.put(`restaurant/Bookings/Change-Booking-Details`,{phoneNo,members,reservationTime},{
                 headers: {
                 "content-type": "application/json"
                          }, 
                })
                  .then((response) => {
                     setSeverity('success');
                     setUpdationStatus(response.data);
                     setPhoneNo('');
                     setMembers(0);
                     setReservationTime('');      
                    }, (error) => {
                       setSeverity('error');
                       setUpdationStatus(error.response.data);
                       setPhoneNo('');
                       setMembers(0);
                       setReservationTime('');                
                       console.log(error);
                    });
                    
}
                                         

  
    return (
      <div className="App" style={{marginTop: "90pt"}}> 
        <Grid>
        <MuiThemeProvider theme={theme}>
          <Card style={{ maxWidth: 510, padding: "20px 5px", margin: "auto auto", backgroundColor:"wheat" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Change Booking Details
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Enter registered phone number and changes you want to update
            </Typography> <br />
              <form onSubmit={(e)=> handleSubmit(e)}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel style={{color:"brown", marginBottom:"5px"}}>Phone Number</InputLabel>
                  <TextField style={{backgroundColor:"white"}} name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} variant="standard" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                  <InputLabel style={{color:"brown", marginBottom:"5px"}}>Number Of Members</InputLabel>
                  <Select style={{backgroundColor:"white"}} name="members" value={members} onChange={membersChange} fullWidth>
                    <option value='0' selected disabled>
                    </option> 
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </Select>
                  </Grid>
                  <Grid item xs={12}>
                  <InputLabel style={{color:"brown", marginBottom:"5px"}}>Reservation Time</InputLabel>
                  <TextField style={{backgroundColor:"white"}} name="reservationTime" type="time" onChange={event => setReservationTime(event.target.value)} value={reservationTime} variant="standard" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained"  onClick={handleClickToOpen} color="primary" fullWidth>Update</Button>
                  </Grid>
  
                </Grid>
              </form>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleToClose}>
                    <Alert onClose={handleToClose} severity={severity} sx={{ width: '100%' }}>
                      {updationStatus}
                    </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          </MuiThemeProvider>
        </Grid>
      </div>
    );
}

export default UpdateBookingForm;