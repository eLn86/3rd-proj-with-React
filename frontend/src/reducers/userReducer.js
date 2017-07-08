import { setUsers, getUsers } from '../API/userAPI';

// will change later to grab from server. for now it is empty array
const initialUsers = getUsers();

const users = (state = initialUsers, action) => {

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
