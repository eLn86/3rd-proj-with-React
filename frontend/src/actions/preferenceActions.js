export const addPreference = (preference) => {
  return {
    type: 'ADD_PREFERENCE',
    preference
  }
}

export const deletePreference = (preference) => {
  return {
    type: 'DELETE_PREFERENCE',
    preference
  }
}
