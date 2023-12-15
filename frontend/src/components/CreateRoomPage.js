import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";


export default class CreateRoomPage extends Component {
  defaultVotes = 2;
  
	constructor(props) {
		super(props);
    // On class components (React old way of creating components)
    // states are handled in this object "state"
    // function components use const values and setState function to handled
    // states updates.
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes
    };
  
    // This is really weird way to access DOM Elements from the class?
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
	}

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === 'true' ? true : false,
    });
  }
  
  handleRoomButtonPressed() {
    // Send request to backend endpoint.
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause
      })
    };
  
    // Common fetch request.
    fetch('/api/create-room', requestOptions)
      .then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
      })
  }

	render() {
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
              onChange={this.handleGuestCanPauseChange}>
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
            defaultValue={this.defaultVotes}
            onChange={this.handleVotesChange}
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
            onClick={this.handleRoomButtonPressed}>
            Create a room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/"
            component={Link}>Back</Button>
        </Grid>
      </Grid>);
	}
}
