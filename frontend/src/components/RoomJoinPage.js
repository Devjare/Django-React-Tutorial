import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button , Grid, Typography, TextField } from "@mui/material";

export default function RoomJoinPage()  {
  let navigate = useNavigate()

  const [ roomCode, setRoomCode ] = useState("");
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState("");

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value)
  }
  
  function roomButtonPressed() {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        code: roomCode
      })
    }

    fetch("/api/join-room", reqOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${roomCode}`)
      } else {
        setError(true)
        setErrorMsg("Room not found.")
      }
    }).catch((error) => {
        console.log(error)
      })
  }
  
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a room.
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField 
          error={error}
          label="Code"
          placeholder="Enter Room Code"
          value={roomCode}
          helperText={errorMsg}
          variant="outlined"
          onChange={ (e) => {
            handleTextFieldChange(e)
          }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}> 
          Enter Room
        </Button>
        <Button variant="contained" color="secondary" to="/" component={Link}> 
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
