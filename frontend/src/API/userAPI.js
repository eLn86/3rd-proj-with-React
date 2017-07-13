/*
* Welcome to the User API!
* This was created because sockets are hard.
* This is linked up to local storage.
*/
export const setUsers = (user) => {
  if(Array.isArray(user)){
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export const getUsers = () => {
  const usersJSON = localStorage.getItem('user');
  let User = [];
  try {
    User = JSON.parse(usersJSON);
  }catch(e){
    console.log("Error: Cound not decode preferences from localstorage");
  }
  return Array.isArray(User) ? User : [];
}
