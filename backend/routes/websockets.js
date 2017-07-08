/**
 * This file is for routing websocket requst.
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */

// Export socket io functions
module.exports = (io) => {

  const usersList = [];

  io.on('connection', (socket) => {
    // User Connection Notificatino
    console.log('==> User Connected : ', socket.id);

    // This is for test purpose of communication between front-back
    socket.on('show connection', (msg) => {
      console.log('this is from client');
      console.log(msg);
      io.emit('show client', socket.id);
    })

    /**
     * Actuall Code should be wrtten below.
     */

    let user = {};

    // If socket is connected with passport, push new user obj to arry
    if (socket.request.user.logged_in) {
      user.roomName = null;
      user.name = socket.request.user.profile.name;
      user.id = socket.request.user.id;
      user.socketId = socket.id;
      user.picture = socket.request.user.profile.picture;
      usersList.push(user);
    }

    // Send the latest userList array to all clients.
    socket.emit('update userList', usersList);


  });

  io.on('disconnect', (socket) => {
    console.log('==> User Diconnected');
  });

};
