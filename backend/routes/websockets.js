/**
 * This file is for routing websocket requst.
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */

// Export socket io functions
module.exports = (io) => {

  const usersList = [];

  io.on('connection', (socket) => {
    // User Connection Notification
    console.log('==> User Connected : ', socket.id);

    // This is for test purpose of communication between front-backend
    socket.on('show connection', (msg) => {
      console.log('this is from client');
      console.log(msg);
      io.emit('show client', socket.id);
    })

    /**
     * Actual Code should be wrtten below.
     */
    
    // Initialise empty user object which is to be manipulated with socket
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

    /**
     * Disconnect
     */
    socket.on('disconnect', (socket) => {
      console.log('==> User Diconnected');

      // Delete disconnected user from the usersList.
      usersList.forEach((e, i) => {
        // If element name and id is equals to the user name and id who left the room, remove the user from the user array
        if (e.name === user.name && e.id === user.id) {
          usersList.splice(i, 1);
        }
      });
      console.log(usersList);
      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
