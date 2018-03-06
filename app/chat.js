var socket = io();
var clientUser = '';

function userCheck(user) {
  if (clientUser.length <= 0) {
    clientUser = user
    document.getElementById('userName').innerHTML = clientUser
  }
}

function emitMessage(message) {
  if (message.length === 0 ) {
    alert('no message')
  } else {
    socket.emit('chat message', message, clientUser);
    document.getElementById('message-form').reset();
  }
}

function displayMessage(msgs) {
  var messageEls = '';
  let messagesContainer = document.querySelector('.messages');

  for (var msg in msgs) {
    if (msgs[msg].sender === clientUser) {
      messageEls += "<li class='message clientUser'>\
                      <h3 class='sender'>" + msgs[msg].sender + "</h3>\
                      <p class=''text>" + msgs[msg].message + "</p>\
                    </li>"
    } else {
      messageEls += "<li class='message'>\
                      <h3 class='sender'>" + msgs[msg].sender + "</h3>\
                      <p class=''text>" + msgs[msg].message + "</p>\
                    </li>"
    }
  }
  document.getElementById('msgs').innerHTML = messageEls;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayNotification(note) {
  let alertEl = "<li class='notification'>" + note + '</li>'
  document.getElementById('notifications').innerHTML = alertEl
}

function userConnection(userList) {
  var userEls = ""
  for (var user in userList) {
    if (userList[user] === clientUser) {
      userEls += "<li class='chatListItem clientUser'>\
                    <i class='fa fa-user-o' aria-hidden='true'></i>\
                    <i class='fa fa-comments' aria-hidden='true'></i>\
                    <p>" + userList[user] + "</p>\
                  </li>"
    } else {
      userEls += "<li class='chatListItem'>\
                    <i class='fa fa-comments' aria-hidden='true'></i>\
                    <p>" + userList[user] + "</p>\
                  </li>"
    }
  }
  document.getElementById('chatList').innerHTML = userEls
}

window.addEventListener('DOMContentLoaded', function() {

  socket.on('chat message', function(msgs) {
    displayMessage(msgs);
  });

  socket.on('user added', function(users, user) {
    userCheck(user)
    userConnection(users)
  });

  socket.on('user removed', function(users) {
    userConnection(users)
  });

  socket.on('system notification', function(alert) {
    displayNotification(alert);
  });

  document.querySelector('#message-form').addEventListener('submit', function(event){
    event.preventDefault();
    emitMessage(document.getElementById('message-input').value);
  }, false);
});
