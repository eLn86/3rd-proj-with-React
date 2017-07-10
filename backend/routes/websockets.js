import uuid from 'uuid';


/**
 * This file is for routing websocket requst.
 */

// Export socket io functions





module.exports = (io) => {

  /* This is the global room - Han */

  const globalRoom = {
    name:'global',
    usersList: []
  }
  var roomIndex = 0;

  // Concurrent Users array.
  const usersList = [];
  // Current active rooms array.
  const roomsList = [];
  // Active users in current room
  const roomUserList = [];
  // Peers ID Array
  const peersIdList = [];
  /* Commenting this out in order to test using an object instead of array - Han


  // room object may contain information below;
  // room.interest
  // room.name
  // room.users
  */


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
    // Send the latest peerID List array to all clients
    io.emit('update peersIdList', peersIdList);
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

     /* This places the user into a global room once they enter the lobby */

    socket.on('enter global room', (msg) => {


      socket.join(globalRoom.name);

      for(var i = 0; i < usersList.length; i++){
        if(usersList[i].id === socket.request.user.id){
          globalRoom.usersList.push(usersList[i]);
        }
      }

      /* For testing purposes. As of 5:18AM this works - Han

      console.log(globalRoom.usersList);
      io.to(globalRoom.name).emit('signal to front', 'second test inside room');
      io.emit('signal to front', 'second test outside room');

      */

    });

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

    socket.on('join room', () => {

      /* Room join prototype code
      /*
      /* Explanation to follow:

      Step 1)

        If no rooms exist, join room 0.
        Push room object containing room name and usersList to roomsList.
        Push user into room usersList.
        Increment roomIndex.

        */
      if(roomsList.length == 0){
        socket.join('' + roomIndex);

        roomsList.push({
          name: '' + roomIndex,
          usersList: []
        })

        for(var i = 0; i < usersList.length; i++){
          if(usersList[i].id === socket.request.user.id){
            roomsList[roomIndex].usersList.push(usersList[i]);
          }
        }

        roomIndex += 1;

        /*

        Step 2)

          Rooms do exist.
          Iterate through rooms list until we find the first one with empty slots.
          Push user into that room according to index.
          Push user into room usersList.
          Break loop.

          */

      }else{

        for(var i = 0; i < roomsList.length; i++){
          if(roomsList[i].usersList.length < 4){
            socket.join('' + i);

            roomsList.push({
              name: '' + roomIndex,
              usersList: []
            })

            for(var i = 0; i < usersList.length; i++){
              if(usersList[i].id === socket.request.user.id){
                roomsList[i].usersList.push(usersList[i]);
              }
            }
            break;

          /*

          Step 3)

            Rooms do exist but have no vacancies.
            Create a new room using the roomIndex, which should be vacant.
            Push user into room roomList.
            Increment room index.
            Operation occurs at end of for loop.

            */

          }else if(i == roomsList.length - 1 && roomsList[i].usersList.length == 4){
            socket.join('' + roomIndex);

            roomsList.push({
              name: '' + roomIndex,
              usersList: []
            })

            for(var i = 0; i < usersList.length; i++){
              if(usersList[i].id === socket.request.user.id){
                roomsList[roomIndex].usersList.push(usersList[i]);
              }
            }

            roomIndex += 1;
          }
        }
      }



      socket.join(roomName);
      // Save room info.
      user.roomName = roomName;
      // Emit room into to the client(for redirect).
      io.to(user.roomName).emit('get roomInfo', roomName);



      /* This test works - Han */
      io.to('0').emit('signal to front', 'testing custom room');
    });

    /* No need to specially leave room ; leaving occurs automatically upon
      redirection or disconnection - Han

    socket.on('room leave', () => {
      // retrieve current room name information from user obejct.
      socket.leave(user.roomName);
      // reset the information.
      user.roomName = null;
    });

    */

    /**
     * Peer related Events
     */

     /**
      * Function: add peer
      * Purpose: to add a peer to the room
      * Dependencies: socket.emit('add peer') in Room.js
      */
    socket.on('add peer', (peerID) => {

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

      // If the roomUserList array is empty or if the userExists boolean is false, create a new user object and push it into the roomUserList array
      if(roomUserList.length === 0 || userExistsInRoomList === false) {
        // Create new user object to store current user
        const currentUser = {};
        currentUser.name = user.name;
        currentUser.socketId = user.socketId;
        currentUser.peerID = peerID;
        roomUserList.push(currentUser);
        peersIdList.push(currentUser.peerID);
      }

      // Send the latest peerID List array to all clients
      // io.emit('get peers', currentUser, peersIdList);
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

      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
