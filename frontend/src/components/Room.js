import React, { Component, useEffect } from 'react';
import { useState } from 'react'
import { useParams, useNavigate, redirect, Link } from 'react-router-dom';
import { ButtonGroup, Button, Typography, Grid } from  "@mui/material";

import CreateRoomPage from "./CreateRoomPage"
import MusicPlayer from "./MusicPlayer"

export default function Room({leaveRoomCallback}) {
  let navigate = useNavigate();
  
  const [ votesToSkip, setVotesToSkip ] = useState(0);
  const [ guestCanPause, setGuestCanPause ] = useState(false);
  const [ isHost, setIsHost ] = useState(false);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ spotifyAutheticated, setSpotifyAuthenticated ] = useState(false);
  const [ song, setSong ] = useState({})
  const [ intervalId, setIntervalId ] = useState(0);
  
  const roomCode = useParams()["roomCode"]; 
  getRoomDetails()
  
  useEffect(() => {
      // Anything in here is fired on component mount.
      setIntervalId(setInterval(getCurrentSong, 5000))
      return () => {
        // Called before unomunt component from DOM 
        // componenteWillUnmount functional alternative
        clearInterval(intervalId)
        setIntervalId(0)
      }
  }, [])

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
    if (isHost) {
      autheticateSpotify();
    }
  }
  
  function autheticateSpotify() {
    fetch("/spotify/is-authenticated")
    .then((response) => response.json())
    .then((data) => {
        setSpotifyAuthenticated(data.status)
        if (!data.status) {
          fetch("/spotify/get-auth-url")
          .then((response) => response.json())
          .then((data) => {
              // alert(data.url)
              window.location.replace(data.url)
            })
        }
      });
  }
  
  function getCurrentSong() {
    fetch("/spotify/current-song")
    .then((response) => {
        if(!response.ok) {
          return {}
        } else {
          return response.json()
        }
      })
    .then((data) => {
        setSong(data)
      })
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
          <CreateRoomPage update={true} vts={votesToSkip}
            gcp={guestCanPause} roomCode={roomCode} updateCallback={getRoomDetails}
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
        <MusicPlayer song={song} />
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
