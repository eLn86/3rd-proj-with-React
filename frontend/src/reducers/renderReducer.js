import { setRender, getRender } from '../API/renderAPI';

const initialRender = getRender();

const renderReducer = (state = initialRender, action) => {

  switch (action.type) {
    case "RENDER_HOME_UPDATE":

        return [action.renderWait]

        break;

    default:
        return state;
  }
}

export default renderReducer;
