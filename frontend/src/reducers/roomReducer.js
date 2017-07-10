
import { setRooms, getRooms } from '../API/roomAPI';

// will change later to grab from server. for now it is empty array
const initialRooms = getRooms();


const roomInfo = (state = initialRooms, action) =>{



  switch (action.type) {
  case 'ADD_ROOM':
      return [
        action.roomName
      ]
      break;

    default:
      return state

  }
}

export default roomInfo;
