
const users = (state = [], action) => {

  console.log(state);

  switch (action.type) {

  case "UPDATE_USER_LIST":
      console.log(action.userArray);

  //from EL: Don't understand why you have to return a cloned action.userArray, please change this comment when you find out
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
