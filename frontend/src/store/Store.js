import { createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

export let initStore = () => {

  const reducer = combineReducers({
  });

  const store = createStore(reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
