import React, { useEffect, useState } from 'react';
import socketClient from "socket.io-client";
import { Chat } from './Chat';
import { PlayerList } from './PlayerList';

let socket;
socket = socketClient('http://localhost:4000');
export const Pong = () => {
  const [players, setPlayers] = useState({});
  const [messages, setMessages] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, [])

  useEffect(() => {
    socket.on('PlayersRefresh', (players) => {
      setPlayers(players);
    });
  }, [players])

  useEffect(() => {
    socket.on('ReceiveMessage', (receivedMessage) => {
      setMessages(messages + receivedMessage + '\n\n');
    });
  }, [messages])

  const sendMessage = (message) => {
    socket.emit('SendMesage', message)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <PlayerList players={players} />
      <Chat sendMessage={sendMessage} messages={messages} />
    </div>
  );
}