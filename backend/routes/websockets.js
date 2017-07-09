/**
 * This file is for routing websocket requst.
 */

// Export socket io functions
module.exports = (io) => {

  // Concurrent Users array.
  const usersList = [];
  // Current active rooms array.
  const roomsList = [];
  // room object may contain information below;
  // room.interest
  // room.name
  // room.users

  /**
   * Socket Connection Events.
   */

  io.on('connection', (socket) => {
    // Initialise empty user object which is to be manipulated with socket
    const user = {};

    // If socket is connected with passport, push new user obj to arry
    if (socket.request.user.logged_in) {
      user.name = socket.request.user.profile.name;
      user.id = socket.request.user.id;
      user.socketId = socket.id;
      user.picture = socket.request.user.profile.picture;
      user.roomName = null;
      // Push the user object to usersList array.
      usersList.push(user);
    }

    // User Connection Notification
    console.log('==> User Connected : ', user.name, socket.id);

    // Send the latest userList array to all clients.
    io.emit('update userList', usersList);

    /**
     * Chat related Events
     */
    socket.on('broadcast msg', (msg) => {
      // minify user data to hide id.
      const miniUser = {};
      miniUser.name = user.name;
      miniUser.picture = user.picture;
      miniUser.socketId = user.socketId;

      // this is test purpose without room functionality.
      io.emit('render msg', msg, miniUser);

      // Above should be changed like below after room implemented.
      // io.to(user.roomName).emit('render msg', msg);
    })


    /**
     * Room related Events
     */
    socket.on('room join', (roomObject) => {
      // below is an example logic.
      // roomObject is passed from frontend contain user's interest.
      // 1. find a proper room in the roomList Array using roomObject.interest
      // 2. Iterating on the array. If room element's interests are matched
      //    with roomObject.interest. emit room into to the client(for redirect).
      //    2-1. Need minimum match number of interest.
      //    2-2. Need to check room is full or not.
      // 3. If not, gernerate new room
      //   3-1. creat string for url of roomName
      //   3-2. push the object to the roomList Array
      //      3-2-1. the object has same interests with roomObject.interest.
      //   3-3. socket.join(roomName);
      //   3-4. save roomName info to user object.
      //   3-5. emit room into to the client(for redirect).
      //
      // below are example syntax.
      // Join to the room (Socket, not redirection)
      socket.join(roomName);
      // Save room info.
      user.roomName = roomName;
      // Emit room into to the client(for redirect).
      io.to(user.roomName).emit('get roomInfo', roomName);
    });

    socket.on('room leave', () => {
      // retrieve current room name information from user obejct.
      socket.leave(user.roomName);
      // reset the information.
      user.roomName = null;
    });


    /**
     * Peer related Events
     */
    socket.on('add peer', (peer) => {
      // Send my peer info to the room for add.
      io.to(user.roomName).emit('get peers', peer);
    })

    socket.on('delete peer', (peer) => {
      // Send my peer info to the room for deletion.
      io.to(user.roomName).emit('get peers', peer);
    })


    /**
     * Disconnect
     */
    socket.on('disconnect', (socket) => {
      console.log('==> User Diconnected');

      // Delete disconnected user from the usersList.
      usersList.forEach((e, i) => {
        // If element name and id is equals to the user name and id
        // who left the room, remove the user from the user array
        if (e.id === user.id) usersList.splice(i, 1);
      });

      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
