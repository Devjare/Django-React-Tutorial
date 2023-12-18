import React, { Component } from "react";
import { Grid, Typography, Card, IconButton, LinearProgress } from "@mui/material";
import { PlayArrow, SkipNextOutlined, PauseCircle } from "@mui/icons-material";


export default function MusicPlayer({ song }) {
  
  const songProgress = song.time / song.duration * 100
    
  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    }
    fetch("/spotify/play-song", requestOptions);
  }
  
  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    }
    fetch("/spotify/pause-song", requestOptions)
    .then((response) => {
        console.log(response)
      })
  }

  function skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/skip-song", requestOptions)
    .then((response) => response.json());

  }

  return (
    <Card>
      <Grid container spacing={1}>
        <Grid item xs={4} align="center">
          <img src={song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item xs={8} align="center">
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {song.artists}
          </Typography>
          <div>
            <IconButton onClick={() => song.is_playing ? pauseSong() : playSong()}>
              { song.is_playing ? <PauseCircle /> : <PlayArrow /> }
            </IconButton>
            <IconButton onClick={() => skipSong() }>
              { <SkipNextOutlined /> } {song.votes} / {" "}{song.votes_required}
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
}
