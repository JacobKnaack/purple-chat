const formatMsgId = (text) => {
  let result = '';
  let textArray = text.split('');

  result = textArray.map(char => {
    if (char === ' ') {
      return '-'
    }
    return char.toLowerCase();
  });

  return result.join('');
}