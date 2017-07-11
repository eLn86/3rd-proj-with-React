import axios from 'axios';
// Adds peerID to user based on id passed from peerjs to socketio
export const addPeerIdToUser = (peerId) => {
  return {
    type: 'ADD_PEERID_TO_USER',
    peerId
  }
}

const updateUser = (user) => {
  return {
    type: "USER_UPDATE",
    user
  }
}

export const getUser = () => {
  return (dispatch) => {
    axios.get('/auth/user')
      .then( (response) => {
        console.log('here user action!');
        const user = response.data;
        console.log("This is user data: ", user);
        dispatch(updateUser(user));
      })
      .catch((error)=> {
        console.error("AJAX: Could not get user @ '/auth/user'")
        dispatch(updateUser({}));
      });
  };
}
