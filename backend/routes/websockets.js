module.exports = (io) => {
  console.log('loaded');
  io.on('connection', (socket) => {
    console.log('==> User Connected : ', socket.id);
  })
}
