import uuid from 'uuid';

/**
 * This file is for routing websocket requst.
 */

// Export socket io functions
module.exports = (io) => {

  // Concurrent Users array.
  const usersList = [];
  // Current active rooms array.
  const roomsList = [];
  // Peers ID Array
  const peersIdList = [];


  /**
   * Socket Connection Events.
   */

  io.on('connection', (socket) => {

    io.emit('testing connection', socket.request.user);
    // Initialise empty user object which is to be manipulated with socket
    const user = {};

    // If socket is connected with passport, push new user obj to arry
    if (socket.request.user.logged_in) {
      user.name = socket.request.user.profile.name;
      user.id = socket.request.user.id;
      user.socketId = socket.id;
      user.picture = socket.request.user.profile.picture;
      user.roomName = '';
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

      io.to(user.roomName).emit('render msg', msg, miniUser);
    });

    /**
     * Room related Events
     */

    socket.on('enter global room', () => {
      socket.join('global');
    });

    socket.on('join room', (preferences) => {
      console.log(preferences);

      socket.leave('global');
      // 1. room checker here with preferences
      let checker = true; // checker for room creation.
      roomsList.forEach((e) => {
        // for the test purpose, preferenceFromFrontend should be one.
        // This is temporal if statement for the test.


        if (e.preference[0] === preferenceFromFrontend && e.userNumber !== 4) {
          console.log('==>>Preference matched!');
          checker = false;
          e.userNumber += 1;
          io.to(socket.id).emit('get roomInfo', e.name);
        }


        console.log(roomsList);
      });
      // 2. Create room if no match.
      if (checker) {
        // this is test object.


        const testRoomObject = {
          name: uuid.v4(),
          preference: ['coffee'],
          userNumber: 0
        };


        // push to roomsList after creation.
        testRoomObject.userNumber += 1;
        roomsList.push(testRoomObject);
        io.to(socket.id).emit('get roomInfo', testRoomObject.name);
      }
      
    });

    socket.on('join room channel', (roomName) => {
      socket.join(roomName)
      user.roomName = roomName;
    })

    /**
     * Peer related Events
     */
    socket.on('add peer', (peerID) => {
      // Send my peer info to the room for add.
      peersIdList.push(peerID);
      // Send the latest peerID List array to all clients
      io.emit('update peersIdList', peersIdList);
    })

    socket.on('delete peer', (peerID) => {
      // Send my peer info to the room for deletion.
      peersIdList.forEach((el, index) => {
        if(el === peerID) {
          peersIdList.splice(index,1);
        }
      })
      // Send the latest peerID List array to all clients
      io.emit('update peersIdList', peersIdList);
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


      roomsList.forEach((e, i) => {
        // Remove the user count from room array.
        if (e.name === user.roomName) e.userNumber -= 1;
        // Destroy empty room.
        if (e.userNumber === 0) roomsList.splice(i, 1);
      });

      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
