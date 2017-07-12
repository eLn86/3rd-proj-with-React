import axios from 'axios';
import { isFetching } from './fetchingActions';
// Adds peerID to user based on id passed from peerjs to socketio
export const addPeerIdToUser = (peerId) => {
  return {
    type: 'ADD_PEERID_TO_USER',
    peerId
  }
}

// This Action for the flow of storing user login status.
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
        const user = response.data;
        dispatch(updateUser(user));
        dispatch(isFetching(false));        
      })
      .catch((error)=> {
        console.error("AJAX: Could not get user @ '/auth/user'")
        dispatch(updateUser({}));
        dispatch(isFetching(false));
      });
  };
}
