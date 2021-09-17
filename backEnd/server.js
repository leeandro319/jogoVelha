import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const game = {
  players: {}
}

sockets.on('connection', (socket) => {
  console.log(socket.id);

  const name = 'Player_' + socket.id.substr(0, 5);
  game.players[socket.id] = { name };
  sendMessage(game.players[socket.id], 'conectado');
  refreshPlayers();

  socket.on('disconnect', () => {
    sendMessage(game.players[socket.id], 'desconectado');
    delete game.players[socket.id];
    refreshPlayers();
  })

  socket.on('SendMesage', (message) => {
    sendMessage(game.players[socket.id], message);
  })
})

const sendMessage = (player, message) => {
  sockets.emit('ReceiveMessage', `${player.name}: ${message}`);
};

const refreshPlayers = () => {
  sockets.emit('PlayersRefresh', game.players);
};

app.get('/', (req, res) => { res.send('Hello World!'); });

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
