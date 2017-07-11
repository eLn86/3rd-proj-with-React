const userReducer = (state = {}, action) => {

  console.log('here again!')
  console.log(action.user);

  switch (action.type) {
    case "USER_UPDATE":
        return action.user || {};

    default:
        return state;
  }
}

export default userReducer;
