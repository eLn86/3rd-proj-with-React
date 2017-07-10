import axios from 'axios';

export const addPreferenceToStore = (preference) => {
  return {
    type: 'ADD_PREFERENCE',
    preference
  }
}

export const deletePreferenceFromStore = (preference) => {
  return {
    type: 'DELETE_PREFERENCE',
    preference
  }
}

export const addPreference = () => {
  return (dispatch) => {
    dispatch(addPreferenceToStore(preference));
    axios.post('/user', preference)
      .then( (response) => {
        console.log('successful post', response);
      })
      .catch((error)=> {
        throw error;
      });
  };
}
