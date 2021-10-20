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
  let inputs = document.querySelector('#inputs').value;
  let mi = message + inputs; 

  connection.send(JSON.stringify({message:message, inputs:inputs}));
  //document.querySelector('#editor').value = '';
});

connection.onmessage = function(event) {
  document.getElementById("output").innerHTML = event.data;
}