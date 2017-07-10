import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { setPreferences, getPreferences } from './API/preferenceAPI';
import { setUsers, getUsers } from './API/userAPI';
import { setRooms, getRooms } from './API/roomAPI';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store/Store';

const store = initStore();


store.subscribe( () => {
  // This stuff happens everytime to store is updated
  const state = store.getState();
  setPreferences(state.preferences);
  setUsers(state.users);
  setRooms(state.rooms)
})


ReactDOM.render(<Provider store={store}>
                <App />
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();
