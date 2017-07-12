import { setFetching, getFetching } from '../API/fetchingAPI';

const initialFetch = getFetching();

const fetchingReducer = (state = initialFetch, action) => {

  switch (action.type) {
    case "FETCHER_UPDATE":

        return [action.isFetching]

        break;

    default:
        return state;
  }
}

export default fetchingReducer;
