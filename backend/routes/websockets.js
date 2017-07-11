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

      // Boolean to check if user exists in the room, default is false
      var userExistsInRoomList = false;

      // Filter the roomUserList array to see if the current user is in the list and store result in boolArray
      var boolArray = roomUserList.filter((peer) => {
        return peer.name === user.name;
      })

      // If boolArray is empty, set userExist boolean to false, else set to true
      if (boolArray.length === 0) {
        userExistsInRoomList = false;
      }
      else {
        userExistsInRoomList = true;
      }

      // If userExists boolean is true, replace that user's peerID in the roomUserList with that of the new passed in peerID from 'add peer'
      if(userExistsInRoomList) {
        roomUserList.forEach((el,index) => {
          if(el.name === user.name) {
            el.peerID = peerID;
          }
        })
      }

      const currentUser = {};
      // If the roomUserList array is empty or if the userExists boolean is false, create a new user object and push it into the roomUserList array
      if(roomUserList.length === 0 || userExistsInRoomList === false) {
        // Create new user object to store current user
        userExistsInRoomList = true;
        currentUser.name = user.name;
        currentUser.socketId = user.socketId;
        currentUser.peerID = peerID;
        roomUserList.push(currentUser);
        peersIdList.push(currentUser.peerID);
      }

      // Send the latest peerID List array to all clients
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
