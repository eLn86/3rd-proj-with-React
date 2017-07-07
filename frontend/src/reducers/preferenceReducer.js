import { setPreferences, getPreferences } from '../API/preferenceAPI';

// will change later to grab from server. for now it is empty array
const initialPreferences = getPreferences();

const preferences = (state = initialPreferences, action) =>{

  console.log(action.type);
  console.log(initialPreferences);

  switch (action.type) {
    case 'ADD_PREFERENCE':
      return [
        ...state,
        action.preference
      ]

      break;

    default:
      return state

  }
}

export default preferences;
