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
  // const roomUserList = [];
  //
  // Peers ID Array
  const peersIdList = [];

  //Global preferences
  var globalPreferenceArray = [];
  var globalPreferences = {};

  var trendingPreferences = []

  /**
   * Socket Connection Events.
   */

  io.on('connection', (socket) => {

    // Initialise empty user object which is to be manipulated with socket
    const user = {};
    // If socket is connected with passport, push new user obj to arry
    if (socket.request.user.logged_in) {
      /* This counts the preferences and  adds them to the global count in global
          preferences */

      var userPreferences = socket.request.user.preferences;

      for(var i = 0; i < userPreferences.length; i++){
        if (globalPreferences[userPreferences[i]] === undefined){
          globalPreferences[userPreferences[i]] = 1;
        }else{
          globalPreferences[userPreferences[i]] += 1;
        }
      }

      /* This sorts preferences into the preference trending array according to
          popularity */

      if(globalPreferenceArray.length > 1){
        for(var i = 1; i < globalPreferenceArray.length; i++){
          if(globalPreferences[globalPreferenceArray[i - 1]] > globalPreferences[globalPreferenceArray[i]]){
            trendingPreferences[i - 1] = globalPreferenceArray[i];
            trendingPreferences[i] = globalPreferenceArray[i - 1];
          }else{
            trendingPreferences[i - 1] = globalPreferenceArray[i - 1];
            trendingPreferences[i] = globalPreferenceArray[i];
          }
        }

        for(var i = 1; i < trendingPreferences.length; i++){
          if(globalPreferences[trendingPreferences[i - 1]] > globalPreferences[trendingPreferences[i]]){
            var temp = trendingPreferences[i - 1];
            trendingPreferences[i - 1] = trendingPreferences[i];
            trendingPreferences[i] = temp;
          }
        }
      }else{
        trendingPreferences = globalPreferenceArray;
      }


      io.emit('send trending', trendingPreferences);



      /* This adds only unique elements to the globalPreferenceArray */

      if(globalPreferenceArray.length == 0){

        globalPreferenceArray = userPreferences;

      }else{

        for(var i = 0; i < userPreferences.length; i++){

          var checker = true;

          for(var j = 0; j < globalPreferenceArray.length; j++){
            if(userPreferences[i] === globalPreferenceArray[j]){
              checker = false;
            }
          }

          if(!checker){
            checker = true;
          }else{
            globalPreferenceArray.push(userPreferences[i]);
          }

        }

      }

      /* Calculate individual preference score */

      var userPreferenceScore = 0;

      for(var i = 0; i < userPreferences.length; i++){
        for(var j = 0; j < globalPreferenceArray.length; j++){
          if(userPreferences[i] === globalPreferenceArray[j]){
            userPreferenceScore += (j + 1);
          }
        }
      }

      /**
       * User object creation.
       */
      user.name = socket.request.user.profile.name;
      user.id = socket.request.user.id;
      user.socketId = socket.id;
      user.peerID = '';
      user.roomName = '';
      user.picture = socket.request.user.profile.picture;
      user.preferenceScore = (userPreferenceScore / userPreferences.length);
      // Push the user object to usersList array.
      usersList.push(user);

      io.emit('testing', userPreferences);
      io.emit('testing', globalPreferenceArray);
      io.emit('testing', usersList);
    }

    // User Connection Notification
    console.log('==> User Connected : ', user.name, socket.id);

    // Send the latest userList array to all clients.
    // io.to(user.roomName).emit('update userList', usersList);

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
      socket.leave(user.roomName);
      console.log('Before Leaving: ',user.roomName)
      socket.join('global');
      user.roomName = 'global';
      console.log('After Leaving: ',user.roomName)
    });

    socket.on('getIDFromSocket', () => {
      io.emit('getID', user.id);
    })

  /* Socket join room. Requires leave condition to balance out preference scores */

    socket.on('join room', () => {

      io.emit('getID', user.id);

      if(roomsList.length == 0){
        const roomObject = {
          //name: uuid.v4(),
          name: uuid.v4(),
          preferenceScore: user.preferenceScore,
          userNumber: 1,
          roomFull: false,
          currentUsers: []  // This is ADDED!!!!!
        };


        io.to(socket.id).emit('get roomInfo', roomObject.name);

      }else{

        /* Check whether or not rooms are full */
        var priority = {};
        var priorityScore = 1000;

        for(var i = 0; i < roomsList.length; i++){

          /* Set room to full based on number of users */
          var comparisonScore = Math.abs(user.preferenceScore - roomsList[i].preferenceScore)

          if(roomsList[i].userNumber == 2){

            roomsList[i].roomFull = true;

          }else if(!roomsList[i].roomFull){

            if(comparisonScore < priorityScore){
              priorityScore = comparisonScore;
              priority = roomsList[i];

            }
          }
        }

        if(priority.name !== undefined){

          priority.userNumber += 1;
          priority.preferenceScore = (priority.preferenceScore + user.preferenceScore) / priority.userNumber;

          io.to(socket.id).emit('get roomInfo', priority.name);

        }else{

          const roomObject = {
            name: uuid.v4(),
            preferenceScore: user.preferenceScore,
            userNumber: 1,
            roomFull: false,
            currentUser: []  // This is ADDED!!!!!
          };

          io.to(socket.id).emit('get roomInfo', roomObject.name);

        }
      }
    });

    socket.on('join room channel', (roomName) => {
      socket.leave('global');
      socket.join(roomName)
      user.roomName = roomName;
      console.log('Room Name in Alex join room channel: ', user.roomName);
      //io.to(user.roomName).emit('update userList', roomUserList);
    })

    /*
     * Peer related Events
     */

     /**
      * Function: add peer
      * Purpose: to add a peer to the room
      * Dependencies: socket.emit('add peer') in Room.js
      */
    socket.on('add peer', (peerID) => {

      // Assign peerID to current socket's object.
      user.peerID = peerID;

      // Broadcast Added peer info to the room except sender.
      io.to(user.roomName).emit('get peers', );






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
        currentUser.picture = user.picture;
        roomUserList.push(currentUser);
      }

      // filter the room user list and return all the peerIDs that are not the peerID of the current user
      var streamList = roomUserList.filter((peer) => {
        return peer.peerID !== peerID
      })

      // Send the updated roomUserList and streamList arrays to all clients
       console.log("Fire to the Room!! :",user.roomName);
       console.log("Fire to the Room!! :",roomUserList);
        io.to(user.roomName).emit('get peers', roomUserList, streamList);
        // Send current user to User List in room
        io.to(user.roomName).emit('update userList', roomUserList);
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
    socket.on('disconnect', () => {
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
      io.to(user.roomName).emit('update userList', roomUserList);
    });

  }); // connection ends here
}; // module ends here
