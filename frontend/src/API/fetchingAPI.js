export const setFetching = (isFetching) => {
  if(Array.isArray(isFetching)){
    localStorage.setItem('isFetching', JSON.stringify(isFetching));
  }
}

export const getFetching = () => {
  const isFetchingJSON = localStorage.getItem('isFetching');
  let isFetching = [];
  try {
    isFetching = JSON.parse(isFetchingJSON);
  }catch(e){
    console.log("Error: Cound not decode preferences from localstorage");
  }
  return Array.isArray(isFetching) ? isFetching : [];
}
