
// Updates user list from user array passed from socket io
export const updateUserList = (userArray) => {
  return {
    type: 'UPDATE_USER_LIST',
    userArray
  }
}
