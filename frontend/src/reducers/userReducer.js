// This reducer for the flow of storing user login status.
// const userReducer = (state = {}, action) => {
//
//   switch (action.type) {
//     case "USER_UPDATE":
//         return action.user || {};
//
//     default:
//         return state;
//   }
// }
//
// export default userReducer;


// This is experimental trial

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
