export const setRooms = (rooms) => {
   if(Array.isArray(rooms)){
     localStorage.setItem('Rooms', JSON.stringify(rooms));
   }
 }

export const getRooms = () => {
  const roomsJSON = localStorage.getItem('Rooms');
  let Rooms = [];
  try {
    Rooms = JSON.parse(roomsJSON);
  }catch(e){
    console.log("Error: Cound not decode Rooms from localstorage");
  }
  return Array.isArray(Rooms) ? Rooms : [];
}
