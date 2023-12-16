import React, { Component } from 'react'
import { Button , Grid, Typography, TextField } from "@mui/material"
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default class RoomJoinPage extends Component {
	constructor(props) {
		super(props);

    this.state = {
      roomCode: "",
      error: false,
      errorMsg: ""
    }
    
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._roomButtonPressed = this._roomButtonPressed.bind(this);
    this.navigate = useNavigate()
	}
  
  // error is a boolean prop,
  // error message doesnt exists, instead as per mui docs, use helperText
	render() {
		return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a room.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField 
            error={this.error}
            label="Code"
            placeholder="Enter Room Code"
            value={this.state.roomCode}
            helperText={this.state.errorMsg}
            variant="outlined"
            onChange={ (e) => {
              // Arrow functions can be used here.
              this._handleTextFieldChange(e)
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this._roomButtonPressed}> 
            Enter Room
          </Button>
          <Button variant="contained" color="secondary" to="/" component={Link}> 
            Back
          </Button>
        </Grid>
      </Grid>
    );
	}

  _handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value
    })
  }

  _roomButtonPressed() {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        code: this.state.roomCode
      })
    }

    fetch("/api/join-room", reqOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${this.state.roomCode}`)
      } else {
        this.setState({
          error: true,
          errorMsg: "Room not found."
        })
      }
    }).catch((error) => {
        console.log(error)
      })
  }
}
