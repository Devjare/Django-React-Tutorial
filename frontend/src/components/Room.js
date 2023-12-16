import React, { Component } from 'react';
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { ButtonGroup, Button, Typography, Grid } from  "@mui/material";

export default function Room() {
  const [ votesToSkip, setVotesToSkip ] = useState(0);
  const [ guestCanPause, setGuestCanPause ] = useState(false);
  const [ isHost, setIsHost ] = useState(false);
  
  const roomCode = useParams()["roomCode"]; 
  getRoomDetails()

  function getRoomDetails() {
    fetch(`/api/get-room?code=${roomCode}`).then((response) => response.json())
    .then(data => {
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIsHost(data.is_host)
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes to skip: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest can pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Is host?: {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Leave room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
      
      
      
}
