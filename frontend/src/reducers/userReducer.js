const users = (state = [], action) => {

  switch (action.type) {
    case "UPDATE_USER_LIST":
      console.log(action.type);
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
