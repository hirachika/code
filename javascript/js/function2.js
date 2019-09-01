var types = {
  error: 'strong',
  warning: 'em',
  info: 'span'
};

var html = '';

messages.forEach(function (value) {
  html += '<li><time>' + value.date + '</time> <'+ types[value.type] + '>[' + value.type + ']' + value.text + '</'+ types[value.type] + '></li>';
});

document.querySelector('ul').innerHTML = html;