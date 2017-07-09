
// Updates user list from user array passed from socket io
export const updateUserList = (userArray) => {
  return {
    type: 'UPDATE_USER_LIST',
    userArray
  }
}

// Adds peerID to user based on id passed from peerjs to socketio
export const addPeerIdToUser = (peerId) => {
  return {
    type: 'ADD_PEERID_TO_USER',
    peerId
  }
}
