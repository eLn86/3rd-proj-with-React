import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { setPreferences, getPreferences } from './API/preferenceAPI';
//import { setUsers } from './API/userAPI';
import { setRooms, getRooms } from './API/roomAPI';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store/Store';

import { getUser } from './actions/userActions';

const store = initStore();

store.subscribe( () => {
  // This stuff happens everytime to store is updated
  const state = store.getState();
  setPreferences(state.preferences);
  //setUsers(state.user);
  setRooms(state.rooms)
})

store.dispatch(getUser());


ReactDOM.render(<Provider store={store}>
                <App />
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();
