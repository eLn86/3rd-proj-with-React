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
      user.picture = socket.request.user.profile.picture;
      user.roomName = 'global';
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


    socket.on('getIDFromSocket', () => {
      io.emit('getID', user.id);
    })

  /* Socket join room. Requires leave condition to balance out preference scores */

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // TO HAN,
  // This function is for room creation, redirction trigger.
  // Room channel join - see 'join room channel', consider reuse this.
  // the socket function called after actual redirecting.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    socket.on('join room', () => {

      io.emit('getID', user.id);

      if(roomsList.length == 0){
        const roomObject = {
          name: uuid.v4(),
          preferenceScore: user.preferenceScore,
          userNumber: 1,
          roomFull: false,
          currentUsers: []
        };
        roomsList.push(roomObject);
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
            currentUsers: []
          };
          roomsList.push(roomObject);
          io.to(socket.id).emit('get roomInfo', roomObject.name);

        }
      }
    });

    // Room channel join after retirecting room.
    socket.on('join room channel', (roomName) => {
      socket.leave('global');
      socket.join(roomName)
      user.roomName = roomName;
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
      console.log('All rooms list: ', roomsList);
      console.log('User Room Name: ', user.roomName);
      var currentRoomObject = roomsList.filter((room) => {
        return room.name === user.roomName;
      })
      console.log('Current Room Object: ',currentRoomObject);
      user.peerID = peerID;
      var sameUserChecker = false;

      for (var i = 0; i < currentRoomObject[0].currentUsers.length; i++) {
        if(user.id === currentRoomObject[0].currentUsers[i].id) {
          sameUserChecker = true;
          currentRoomObject[0].currentUsers[i].peerID = peerID;
          break;
        }
      }

      if(!sameUserChecker) {
        currentRoomObject[0].currentUsers.push(user);
      }


      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // To Han and El.
      // UserList updated by currentRoomObject[0].currentUsers
      // Need a logic when an user leave, updating the currentRoomObject[0].currentUsers.
      // Thank you!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // Send the updated roomUserList and streamList arrays to all clients
      io.to(user.roomName).emit('get peers', currentRoomObject[0].currentUsers);
      // Send the lastes user list.
      io.to(user.roomName).emit('update userList', currentRoomObject[0].currentUsers);
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

      });



      // Send the latest userList array to all clients.
      //io.to(user.roomName).emit('update userList', roomUserList);
    });

  }); // connection ends here
}; // module ends here
