const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000

var clientUsers = []
var msgs = []

app.use(express.static(path.join(__dirname, 'app')));

io.on('connection', function(socket) {
  console.log('user connected')
  clientUsers.push(socket.id)
  io.emit('system notification', 'A User Joined - ', 'Total Users: ' + clientUsers.length);
  io.emit('user added', clientUsers, socket.id);
  io.emit('chat message', msgs)

  socket.on('disconnect', function() {
    console.log('user disconnected')

    let i = clientUsers.indexOf(socket.id);
    clientUsers.splice(i, 1)

    io.emit('system notification', 'A User Left - ', 'Total Users: ' + clientUsers.length);
    io.emit('user removed', clientUsers);
  });

  socket.on('chat message', function(msg, user) {
    msgs.push({
      sender: user,
      message: msg
    });

    if(msgs.length > 1000) {
      msgs.shift();
    }

    io.emit('chat message', msgs);
  });

  socket.on('philbot', function(msg) {
    msgs.push({
      sender: 'Phil',
      message: 'Thanks for talking to me, unfortunately I\'m not working yet :/'
    });

    io.emit('chat message', msgs);
  });
});

http.listen(PORT, function(){
  console.log('app running on port :::' + PORT);
});
