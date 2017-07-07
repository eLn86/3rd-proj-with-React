const user = (state = [], action) => {

  console.log(action);

  switch (action.type) {
    case "CREATE_USER":
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
