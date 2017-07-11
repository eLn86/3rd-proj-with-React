const peer = (state = {}, action) =>{

  switch (action.type) {
  case 'STORE_PEER':
      return action.peer;
      break;

    default:
      return state

  }
}

export default peer;
