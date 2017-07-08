/**
 * This file is for routing websocket requst.
 */

// Export socket io functions
module.exports = (io) => {

  // Concurrent Users array.
  const usersList = [];
  // Current active rooms array.
  const roomsList = [];

  /**
   * Socket Connection Events.
   */

  io.on('connection', (socket) => {
    // User Connection Notification
    console.log('==> User Connected : ', socket.id);

<<<<<<< HEAD
=======
    // This is for test purpose of communication between front-backend
    socket.on('show connection', (msg) => {
      console.log('this is from client');
      console.log(msg);
      io.emit('show client', socket.id);
    })

    /**
     * Actual Code should be wrtten below.
     */

>>>>>>> 20eddde54db00b97b1af2e532d3b9a57626213c4
    // Initialise empty user object which is to be manipulated with socket
    let user = {};

    // If socket is connected with passport, push new user obj to arry
    if (socket.request.user.logged_in) {
      user.roomName = null;
      user.name = socket.request.user.profile.name;
      user.id = socket.request.user.id;
      user.socketId = socket.id;
      user.picture = socket.request.user.profile.picture;
      // Push the user object to usersList array.
      usersList.push(user);
    }

    // Send the latest userList array to all clients.
    io.emit('update userList', usersList);

    /**
     * Disconnect
     */
    socket.on('disconnect', (socket) => {
      console.log('==> User Diconnected');

      // Delete disconnected user from the usersList.
      usersList.forEach((e, i) => {
        // If element name and id is equals to the user name and id who left the room, remove the user from the user array
        if (e.id === user.id) usersList.splice(i, 1);
      });

      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
