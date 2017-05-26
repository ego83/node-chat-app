var socket = io();

function scrollToBottom () {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight      = messages.prop('clientHeight');
  var scrollTop         = messages.prop('scrollTop');
  var scrollHeight      = messages.prop('scrollHeight');
  var newMessageHeight  = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('all good');
    }
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  console.log(users);
  var ul = $('<ul><ul>');

  users.forEach(function (user) {
    ul.append($('<li></li>').text(user));
  });
  $('#users').html(ul);
});

socket.on('newMessage', function(message) {
  // console.log('new message recieved:', message);

  var formattedTime = moment(message.createdAt).format('HH:mm:ss');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('HH:mm:ss');

  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  // var li = $('<li></li>');
  // var a  = $('<a target="_blank">my current location</a>')
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  //
  // li.append(a);
  // $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: "another ME",
//   text: "hello"
// }, function (data) {
//   console.log('got it:', data);
// });

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationBtn = $('#send-locations');

locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('ups. geolocation not supported by your stupid browser');
  }

  var btnText = {
    on: "Send location",
    off: "Sending...",
  }

  locationBtn.attr('disabled', 'disabled').text(btnText.off);

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    locationBtn.removeAttr('disabled').text(btnText.on);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationBtn.removeAttr('disabled').text(btnText.on);
    alert('unable to fetch location');
  });
});
