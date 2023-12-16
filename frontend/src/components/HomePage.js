import React, { Component } from 'react'
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room"
// NEW WAY
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom" //
// OLD WAY
import { 
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Redirect,
} from "react-router-dom"

export default function HomePage() {
  return (
			<Router>
		 		<Routes>
					<Route exact path="/" element={
						<h1> This is the home page </h1>
					} />
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
