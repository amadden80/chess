var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));

var gameState;

io.on('connection', function (socket) {
  if(gameState){
    io.emit('moveMade', gameState)
  }
  socket.on('makeMove', function (data) {
    io.emit('moveMade', data)
    gameState = data;
  });
});

server.listen(8000)
console.log('...listen on 8000')
