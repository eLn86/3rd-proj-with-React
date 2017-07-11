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
  // Active users in current room
  const roomUserList = [];
  // Peers ID Array
  const peersIdList = [];


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

    socket.on('getIDFromSocket', () => { 
      io.emit('getID', user.id);
    })

    socket.on('join room', (preferenceFromFrontend) => {
      io.emit('getID', user.id);
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
        console.log('Rooms List: ',roomsList);
        io.to(socket.id).emit('get roomInfo', testRoomObject.name);
      }
    });

    socket.on('join room channel', (roomName) => {
      socket.join(roomName)
      user.roomName = roomName;
      console.log('Room Name in Alex join room channel: ', user.roomName);
    })

    /**
     * Peer related Events
     */

     /**
      * Function: add peer
      * Purpose: to add a peer to the room
      * Dependencies: socket.emit('add peer') in Room.js
      */
    socket.on('add peer', (peerID) => {
      console.log('userslist ', usersList);
      // Boolean to check if user exists in the room, default is true
      var userExistsInRoomList = true;

      // Iterate over the room user list. If the name is not found, set user exists boolean to false
      roomUserList.forEach((el,index) => {
        if(el.name === user.name) {
          el.peerID = peerID;
        }
        else{
          userExistsInRoomList = false;
        }
      })
      const currentUser = {};
      console.log('Room User List Array: ', roomUserList);
      // If the roomUserList array is empty or if the userExists boolean is false, create a new user object and push it into the roomUserList array
      if(roomUserList.length === 0 || userExistsInRoomList === false) {
        // Create new user object to store current user

        currentUser.name = user.name;
        currentUser.socketId = user.socketId;
        currentUser.peerID = peerID;
        roomUserList.push(currentUser);
        peersIdList.push(currentUser.peerID);
      }

      console.log('Room User List Array after creating new user: ', roomUserList);
      // Send the latest peerID List array to all clients
      console.log('Room Name: ', user.roomName);
        io.to(user.roomName).emit('get peers', roomUserList, peersIdList);
    })

/* Commented out for later use
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

*/

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
