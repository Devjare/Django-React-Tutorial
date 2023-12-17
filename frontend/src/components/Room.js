import React, { Component } from 'react';
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ButtonGroup, Button, Typography, Grid } from  "@mui/material";

import CreateRoomPage from "./CreateRoomPage"

export default function Room({leaveRoomCallback}) {
  let navigate = useNavigate();
  const [ votesToSkip, setVotesToSkip ] = useState(0);
  const [ guestCanPause, setGuestCanPause ] = useState(false);
  const [ isHost, setIsHost ] = useState(false);
  const [ showSettings, setShowSettings ] = useState(false);
  
  const roomCode = useParams()["roomCode"]; 
  getRoomDetails()
  
  // Since get room details is called each time home page is rendered
  // Because on routes there's a Room coponent. It calls getRoomDetails constanltly
  // even if the room doesn't exists, for that reason if the response is not ok (i.e., 
  // the requested room doesn't exists). once again use the callback to go home.
  function getRoomDetails() {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback()
          navigate("/")
        }
        return response.json()
      })
    .then((data) => {
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIsHost(data.is_host)
      });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }
    fetch("/api/leave-room", requestOptions)
    .then((response) => {
        leaveRoomCallback()
        navigate("/")
      })
  }

  function updateShowSettings(value) {
    setShowSettings(value);
    setIsHost(false);
  }

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage udpate={true} vts={votesToSkip}
            gcp={guestCanPause} roomCode={roomCode} updateCallback={() => {}}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={ () => updateShowSettings(false)}>
            Close
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
        </Grid>
      </Grid>
    );
  }
  
  // not using an arrow function makes to activate the onclick concstatly since it's a call and not a 
  // piece of code. maybe if the function returned a reference to a function it would work.
  function renderSettingsMethod() {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={ () => updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  if (showSettings) {
    return renderSettings()
  } else {
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
        {isHost ? renderSettingsMethod() : null }
        <Grid item xs={12} align="center">
          <ButtonGroup>
            <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
              Leave room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
      
      
      
}
