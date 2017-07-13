import { setUsers, getUsers } from '../API/userAPI';

const initialUser = getUsers();

const userReducer = (state = initialUser, action) => {

  switch (action.type) {
    case "USER_UPDATE":

        return [action.user]

        break;

    default:
        return state;
  }
}

export default userReducer;
