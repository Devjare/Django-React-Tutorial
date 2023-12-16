import React, { Component } from 'react';
import { useState } from 'react';
// useHistory is deprecated from react-router-dom v5
// import { useHistory } from 'react-router-dom'; 
// react-router-dom v6 uses useNavigate
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";

import { Button , Grid, Typography, TextField, FormHelperText, FormControl,
  Radio, RadioGroup, FormControlLabel } from "@mui/material"


export default function CreateRoomPage() {
  let navigate = useNavigate();
  const defaultVotes = 2;

  const [ guestCanPause, setGuestCanPause ] = useState(false);
  const [ votesToSkip, setVotesToSkip ] = useState(0);

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value == "true");
  }
  
  function handleVotesChange(e) {
    setVotesToSkip(e.target.value);
  }

  function handleRoomButtonPressed(e) {
  // Update on database new values.
    // Send request to backend endpoint.
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      })
    };
    // Common fetch request.
    fetch('/api/create-room', requestOptions)
      .then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
        // this.props.history.push()
        navigate("/room/" + data.code);
        
      })
  }

  return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">
                Guest control of playback state.
              </div>
            </FormHelperText>
            <RadioGroup row 
              defaultValue="true" 
              onChange={handleGuestCanPauseChange}>
              <FormControlLabel 
                value="true" 
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom" />
              
              <FormControlLabel 
                value="false" 
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required={true} 
            type="number" 
            defaultValue={defaultVotes}
            onChange={handleVotesChange}
            inputProps={{
              min: 1,
              style: {
                  textAlign: "center",
                }
            }} />
            <FormHelperText>
              <div align="center">
                Votes required to skip a song.
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button 
            color="primary" 
            variant="contained" 
            onClick={handleRoomButtonPressed}>
            Create a room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/"
            component={Link}>Back</Button>
        </Grid>
      </Grid>);
}
