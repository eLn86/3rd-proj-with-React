const users = (state = [], action) => {

  console.log(state);

  switch (action.type) {

  case "UPDATE_USER_LIST":
      console.log(action.userArray);

      return [
        ...action.userArray
      ]
      break;

    case "READ_USER":
      break;
    case "UPDATE_USER":
      break;
    case "DELETE_USER":
      break;
    case "INIT_USERS":
      break;

    default:
      return state;
  }
}

export default users;
