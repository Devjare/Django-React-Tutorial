import React, { Component } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';


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
    <div>
      <h3>Room code: {roomCode}</h3>
      <p>Votes to skip: {votesToSkip}</p>
      <p>Guest can pause: {guestCanPause.toString()}</p>
      <p>Is host?: {isHost.toString()}</p>
    </div>
  )
}
