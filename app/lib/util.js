const formatMsgId = (text) => {
  let result = '';
  let textArray = text.split('');

  result = textArray.map(char => {
    if (char === ' ') {
      return '-';
    } else if (char === '\'') {
      return '';
    }
    return char.toLowerCase();
  });

  return result.join('');
}

const messageTemplate  = (message, textId, clientUser, addedMsg) => {
  let templateResult = "<li id='" + message.sender + "' class='message'>\
                          <h3 class='sender'>" + message.sender + "</h3>\
                          <p id='"+ textId + "' class='text'>" + message.message + "</p>\
                        </li>"

  if (clientUser) {
    // add clientUser class
  }

  if (addedMsg) {
    // add addedMsg class
  }

  return templateResult
}