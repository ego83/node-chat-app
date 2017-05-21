var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message recieved:', message);
});

// socket.on('welcomeMessage', function(message){
//   console.log(message);
// });
//
// socket.on('newUser', function(message){
//   console.log(message);
// });
