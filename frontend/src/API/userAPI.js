import io from 'socket.io-client';

const socket = io('/');

socket.on('show client', (id) => {
  console.log('This is from server, socket is connected well.');
  console.log(id);
})

const msg = 'hello world';
setInterval(() => {
  socket.emit('show connection', msg);
}, 10000);

socket.on('update userList', (arr) => {
  console.log(arr);
})
