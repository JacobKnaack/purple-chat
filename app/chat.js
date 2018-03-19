const socket = io();
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

function emitBot(query, clientUser) {
  socket.emit('philbot', query, clientUser);
}

function displayMessage(msgs) {
  let messageEls = '';
  let messagesContainer = document.querySelector('.messages');
    

  for (var msg in msgs) {
    // util method
    let messageId = formatMsgId(msgs[msg].message);
  
    if (msgs[msg - 1] && msgs[msg].sender === msgs[msg - 1].sender) {
      if (msgs[msg].sender === clientUser) {
        messageEls += "<li id='"+msgs[msg].sender+"' class='message clientUser addedMsg'>\
                        <p id='"+ messageId + "' class='text'>" + msgs[msg].message + "</p>\
                      </li>"
      } else {
        messageEls += "<li id='" + msgs[msg].sender +"' class='message addedMsg'>\
                        <p id='"+ messageId + "' class='text'>" + msgs[msg].message + "</p>\
                      </li>"
      }
    } else {
      if (msgs[msg].sender === clientUser) {
        messageEls += "<li class='message clientUser'>\
                        <h3 class='sender'>" + msgs[msg].sender + "</h3>\
                        <p id='"+ messageId + "' class='text'>" + msgs[msg].message + "</p>\
                      </li>"
      } else {
        messageEls += messageTemplate(msgs[msg], messageId);
      }  
    }

  }

  document.getElementById('msgs').innerHTML = messageEls;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayNotification(note, status) {
  let alertEl = "<li class='notification'><span class='note'>"+ note +"</span>"+ status +"</li>"
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

  socket.on('system notification', function(alert, stats) {
    displayNotification(alert, stats);
  });

  document.querySelector('#message-form').addEventListener('submit', function(event){
    let userInput = document.getElementById('message-input').value;

    event.preventDefault();

    emitMessage(userInput);

    if(userInput.startsWith('/pb')) {
      emitBot(userInput, clientUser);
    }

  }, false);

});
