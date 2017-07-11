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
  const globalPreferenceArray = [];
  // Peers ID Array
  const peersIdList = [];

  const preferenceCounter = {};


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

    socket.on('enter global room', (preferences) => {
      socket.join('global');

      var trendingPreferences = [];

      /* This checks whether the elements in preferences exist in globalPreferenceArray.
         If not, then push it to that array */

         /* If preference does not exist in global preference array, put it */


      for(var i = 0; i < preferences.length; i++){
        var existingPreference = globalPreferenceArray.some((el) => {
          return el === preferences[i];
        });
        if (!existingPreference) {
          globalPreferenceArray.push(preferences[i]);
        }
      }

      /* This associates a certain user with his preferences */

      for(var i = 0; i < usersList.length; i++){
        if(socket.request.user.id === usersList[i].id){
          usersList[i].preferences = preferences
        }
      }

      /* This counts the number of preferences */

      for(var j = 0; j < preferences.length; j++){

        if(preferenceCounter[preferences[j]] === undefined){
          preferenceCounter[preferences[j]] = 1;

        }else{
          preferenceCounter[preferences[j]] = preferenceCounter[preferences[j]] + 1;
        }

      }


      /* COMPLETE BRUTE FORCE DUMB SORT */

      for(var j = 1; j < globalPreferenceArray.length; j++){

        if(preferenceCounter[globalPreferenceArray[j - 1]] < preferenceCounter[globalPreferenceArray[j]]){
          var temp = globalPreferenceArray[j];
          globalPreferenceArray[j] = globalPreferenceArray[j - 1];
          globalPreferenceArray[j - 1] = temp;
        }
      }

      for(var j = 1; j < globalPreferenceArray.length; j++){

        if(preferenceCounter[globalPreferenceArray[j - 1]] < preferenceCounter[globalPreferenceArray[j]]){
          var temp = globalPreferenceArray[j];
          globalPreferenceArray[j] = globalPreferenceArray[j - 1];
          globalPreferenceArray[j - 1] = temp;
        }
      }



      for(var j = 0; j < 10; j++){
        if(globalPreferenceArray[j] !== undefined){
          trendingPreferences.push(globalPreferenceArray[j]);
        }
      }

      io.emit('preference trend', trendingPreferences)

    });




    socket.on('join room', (preferences) => {


         /* Calculate preference score based on index position of preference in
            global preference array */

         let preferenceScore = 0;

         for(var i = 0; i < preferences.length; i++){
           for(var j = 0; j < globalPreferenceArray.length; j++){
             if(preferences[i] === globalPreferenceArray[j]){
               preferenceScore = preferenceScore + (j + 1);
             }
           }
         }

         /* Get average preference score by dividing by number of preferences */

         if(preferenceScore != 0){
           preferenceScore = (preferenceScore/preferences.length);
         }

         /* If no rooms, create a new room with existing preference score and push
            to rooms list */

         if(roomsList.length == 0){

           let roomID = uuid.v4();
           let roomObject = {
             name: roomID,
             preferenceScore: preferenceScore,
             userNumber: 1
           }

           roomsList.push(roomObject);
           io.to(socket.id).emit('get roomInfo', roomID);

           /* If there are rooms find rooms with vacancies and place in vacantRooms */

         }else if(roomsList.length > 0){

           var vacantRooms = [];

           for(var i = 0; i < roomsList.length; i++){

             /* If no vacant rooms, create a new room and break loop */

             if(roomsList.userNumber == 4 && i == roomsList.length - 1){

               let roomID = uuid.v4();
               let roomObject = {
                 name: roomID,
                 preferenceScore: preferenceScore,
                 userNumber: 1
               }

               roomsList.push(roomObject);
               io.to(socket.id).emit('get roomInfo', roomID);
               break;

               /* else push new vacant room */

             }else if(roomsList[i].userNumber < 4){

               vacantRooms.push(roomsList[i]);

             }
         }

         /* If room with vacancies exists, determine the room with the closest preference score */

         if(vacantRooms.length > 0){

           var priority = {};
           var previousScore = 100;

           for(var i = 0; i < vacantRooms.length; i++){
             if(Math.abs(preferenceScore - vacantRooms[i].preferenceScore) < previousScore){
               priority = vacantRooms[i];
             }
           }

           /* The room with the smallest difference is chosen */

           io.to(socket.id).emit('get roomInfo', priority.name);

           /* calculate room preference score by dividing total score by number of users */

           for(var i = 0; i < roomsList.length; i++){
             if(priority.name === roomsList[i].name){
               roomsList[i].userNumber = roomsList[i].userNumber + 1;
               roomsList[i].preferenceScore = ((roomsList[i].preferenceScore + preferenceScore) / roomsList[i].userNumber)
               break;
             }
           }
         }
       }
     });


      /*

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
      */



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
        if (e.name === user.roomName) {
          e.userNumber -= 1;

        }
        // Destroy empty room.
        if (e.userNumber === 0) roomsList.splice(i, 1);
      });

      // Send the latest userList array to all clients.
      io.emit('update userList', usersList);
    });

  }); // connection ends here
}; // module ends here
