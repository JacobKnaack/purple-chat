const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const pythonShell = require('python-shell');
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

  socket.on('philbot', function(msg, user) {
    var options = {
      pythonOptions: ['-u'],
      args: [msg, user]
    };

    pythonShell.run('chatbot.py', options, function(err, results) {
      if (err) {
        throw err;
      } else if (results == null) {
        msgs.push({
          sender: 'Phil',
          message: 'Couldn\'t understand you. Please try again...'
        });
      } else {
        let message = results.toString();
        msgs.push({
          sender: 'Phil',
          message: message
        });
      }
  
      io.emit('chat message', msgs);
    });
  });
});

http.listen(PORT, function(){
  console.log('app running on port :::' + PORT);
});
