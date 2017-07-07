import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store/Store';

const store = initStore();


store.subscribe( () => {

})


ReactDOM.render(<Provider store={store}>
                <App />
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();
