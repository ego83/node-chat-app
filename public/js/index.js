var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message recieved:', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a  = $('<a target="_blank">my current location</a>')

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  $('#messages').append(li);
});

socket.emit('createMessage', {
  from: "another ME",
  text: "hello"
}, function (data) {
  console.log('got it:', data);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: $('[name=message]').val()
  }, function () {

  });
});

var locationBtn = $('#send-locations');

locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('ups. geolocation not supported by your stupid browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('unable to fetch location');
  });
});
