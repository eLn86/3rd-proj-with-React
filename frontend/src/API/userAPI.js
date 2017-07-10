// Import axios for ajax calls
import axios from 'axios';

/*
* Welcome to the User API!
* This was created because sockets are hard.
* This is linked up to local storage.
*/
export const getUser = () => {
  axios.get('/home')
    .then((response) => {
      console.log('data: ' + response.data);
    })
    .catch((error)=> {
      console.log(error);
    });
}

export const setUsers = (users) => {
  if(Array.isArray(users)){
    localStorage.setItem('Users', JSON.stringify(users));
  }
}

export const getUsers = () => {
  const usersJSON = localStorage.getItem('Users');
  let Users = [];
  try {
    Users = JSON.parse(usersJSON);
  }catch(e){
    console.log("Error: Cound not decode preferences from localstorage");
  }
  return Array.isArray(Users) ? Users : [];
}
