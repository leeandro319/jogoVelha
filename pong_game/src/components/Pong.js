import React, { useEffect, useState } from 'react';
import socketClient from "socket.io-client";

const socket = socketClient('http://localhost:4000');

export const Pong = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('PlayersRefresh', (players) => {
      setPlayers(players);
    });
  }, [])


  return (
    <div>
      {Object.keys(players).map(key => (
        <div key={key}>
          {players[key].name}
        </div>
      ))}
    </div>
  );
}