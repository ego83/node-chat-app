const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });

  socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

  socket.on('createMessage', (message) => {
    console.log('new message arrived:', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

});

server.listen(port, () => {
  console.log(`app listening to port ${port}`);
});

// console.log(__dirname + '/../public');
// console.log(publicPath);
