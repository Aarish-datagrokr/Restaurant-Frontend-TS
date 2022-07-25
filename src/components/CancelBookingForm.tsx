import React,{useState} from 'react';
import {Theme, Grid, TextField, Button, Card, CardContent, Typography, makeStyles, InputLabel} from '@material-ui/core';
import axios, { responseEncoding } from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { CatchClause } from 'typescript';
import { Http2ServerResponse } from 'http2';

const useStyles = makeStyles((Theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}));

    const CancelBookingForm = () => {

    const [cancellationStatus,setCancellationStatus]=useState<string>('Enter details to cancel booking.');
    const [phoneNo,setPhoneNo]=useState<string>('');
    
    const [open,setOpen]=React.useState(false);
    const handleClickToOpen = () => {
      if(phoneNo.length==10) setOpen(true);
    };
    const handleToClose = () => {
      setOpen(false);
      setCancellationStatus("Enter details to cancel booking");
    };

    const classes = useStyles();
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        try{
          var response =  await axios({ 
            url: `/restaurant/Bookings/Cancel-Booking`, 
            data: phoneNo,
            method: 'DELETE'
          });
          setCancellationStatus(response.data);
          setPhoneNo('');
        } catch(err: any) {
          if(!err.response.data.equals("")) setCancellationStatus(err.response.data);
          else setCancellationStatus("Something Wrong.");          
          setPhoneNo('');
          console.log("err->", err.response.data)
        }       
    }
    
  
    return (
      <div className="App"> 
        <Grid>
          <Card style={{ maxWidth: 510, padding: "20px 5px", margin: "0 auto" , boxShadow: "none"}}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Cancel Booking
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Enter your registered phone number
            </Typography> <br />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} variant="standard" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" onClick={handleClickToOpen} color="primary" fullWidth>Delete</Button>
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
              {cancellationStatus}
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

export default CancelBookingForm;