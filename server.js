var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));

io.on('connection', function (socket) {
  socket.on('makeMove', function (data) {
    io.emit('moveMade', data)
  });
});

server.listen(8000)
console.log('...listen on 8000')
