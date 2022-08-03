import React,{useState} from 'react';
import {Theme, Grid, TextField, Button, Card, CardContent, Typography, makeStyles, InputLabel} from '@material-ui/core';
import axios, { responseEncoding } from 'axios';
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

    const CancelBookingForm = () => {

    const [cancellationStatus,setCancellationStatus]=useState<string>('Enter details to cancel booking.');
    const [phoneNo,setPhoneNo]=useState<string>('');
    
    const [open,setOpen]=useState(false);
    const [severity,setSeverity]=useState<AlertColor | undefined>(undefined);
    const handleClickToOpen = () => {
      if(phoneNo.length==10) setOpen(true);
    };
    const handleToClose = () => {
      setOpen(false);
    };

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        try{
          var response =  await axios({ 
            url: `/restaurant/Bookings/Cancel-Booking`, 
            data: phoneNo,
            method: 'DELETE'
          });
          setSeverity('success');
          setCancellationStatus(response.data);
          setPhoneNo('');
        } catch(err: any) {
          setSeverity('error');
          setCancellationStatus(err.response.data);
          setPhoneNo('');
          console.log("err->", err.response.data)
        }       
    }
    
  
    return (
      <div className="App" style={{marginTop: "90pt"}}> 
        <Grid>
        <MuiThemeProvider theme={theme}>
          <Card style={{ maxWidth: 510, padding: "20px 5px", margin: "auto auto" , backgroundColor:"wheat"}}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Cancel Booking
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Enter your registered phone number
            </Typography> <br />
              <form id='form' onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <InputLabel style={{color:"brown", marginBottom:"5px"}}>Phone Number</InputLabel>
                  <TextField id='phoneNo' style={{backgroundColor:"white"}} name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} variant="standard" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button id='deleteButton' type="submit" variant="contained" onClick={handleClickToOpen} color="primary" fullWidth>Delete</Button>
                  </Grid>  
                </Grid>
              </form>
              <Snackbar
                id='alert'
                open={open}
                autoHideDuration={6000}
                onClose={handleToClose}>
                    <Alert onClose={handleToClose} severity={severity} sx={{ width: '100%' }}>
                      {cancellationStatus}
                    </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          </MuiThemeProvider>
        </Grid>
      </div>
    );
}

export default CancelBookingForm;