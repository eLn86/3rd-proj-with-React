export const setRender = (renderWait) => {
  if(Array.isArray(renderWait)){
    localStorage.setItem('renderWait', JSON.stringify(renderWait));
  }
}

export const getRender = () => {
  const renderWaitJSON = localStorage.getItem('renderWait');
  let renderWait = [];
  try {
    renderWait = JSON.parse(renderWaitJSON);
  }catch(e){
    console.log("Error: Cound not decode RenderBoolean from localstorage");
  }
  return Array.isArray(renderWait) ? renderWait : [];
}
