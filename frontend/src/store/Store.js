// Import Redux dependencies
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// Import reducers
import preferenceReducer from '../reducers/preferenceReducer';
import userReducer from '../reducers/userReducer';
import roomReducer from '../reducers/roomReducer';
import fetchingReducer from '../reducers/fetchingReducer';
import renderReducer from '../reducers/renderReducer';

export let initStore = () => {

  // Combine reducers
  const reducer = combineReducers({
    preferences: preferenceReducer,
    user: userReducer,
    rooms: roomReducer,
    isFetching: fetchingReducer,
    renderWait: renderReducer
  });

  // Create the store with all the reducers and allow for chrome redux dev tools to run and read reducers
  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
