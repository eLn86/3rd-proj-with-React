import { createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import preferenceReducer from '../reducers/preferenceReducer';
import userReducer from '../reducers/userReducer';

export let initStore = () => {

  const reducer = combineReducers({
    preferences: preferenceReducer,
    users: userReducer
  });

  const store = createStore(reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
