const connection = new WebSocket('ws://localhost:8765');

connection.onopen = () => {
  console.log('connected');
};

connection.onclose = () => {
  console.error('disconnected');
};

connection.onerror = error => {
  console.error('failed to connect', error);
};

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  let message = document.querySelector('#editor').value;
  connection.send(message);
  document.querySelector('#editor').value = '';
});