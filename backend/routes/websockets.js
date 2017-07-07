/**
 * This file is for routing websocket requst.
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */

// Export socket io functions
module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('==> User Connected : ', socket.id);
  });

  io.on('disconnect', (socket) => {
    console.log('==> User Diconnected');
  });

};
