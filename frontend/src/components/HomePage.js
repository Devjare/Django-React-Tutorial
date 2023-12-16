import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { ButtonGroup, Button, Typography, Grid } from  "@mui/material";
// NEW WAY
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom" //
// OLD WAY
import { 
	BrowserRouter as Router,
	Route,
	Routes,
  Link,
  Navigate
} from "react-router-dom"

export default function HomePage() {
  const [ roomCode, setRoomCode ] = useState(null);
  
  useEffect(() => {
    fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => {
        setRoomCode(data.code);
      })
  }, [])
  // async function componentDidMount() {
  //   fetch("/user-in-room")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setRoomCode(data.code)
  //   });
  // }
  
  // if there's an existing room code in the session, redirect to such room.
  return (
			<Router>
		 		<Routes>
          <Route exact path="/"  element={ roomCode ? ( <Navigate to={`/room/${roomCode}`} /> ) : renderHomePage()} />
					<Route
						path="/join"
						element={<RoomJoinPage />} />
					<Route
						path="/create"
						element={<CreateRoomPage />} />
					<Route
						path="/room/:roomCode"
						element={<Room />} />
				</Routes>
			</Router>
		);
}

function renderHomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={ Link }>
            Join a room
          </Button>
          <Button color="secondary" to="/create" component={ Link }>
            Create a room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )

}
