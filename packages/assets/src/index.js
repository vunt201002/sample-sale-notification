import App from './App';
import React from 'react';
import './styles/app.scss';
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import createStore from './reducers/createStore';
import {setUser} from './actions/layout/setUserAction';
import {auth, history} from './helpers';

const store = createStore(history);

window.isAuthenticated = false;

auth.onAuthStateChanged(function(user) {
  if (user === null && !window.isAuthenticated) {
    window.location.href = `/auth/login`;
    ReactDOM.render(<div />, document.getElementById('app'));
  } else {
    window.isAuthenticated = true;
    store.dispatch(setUser(user));
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    );
  }
});

// Remove loading from main view
const loading = document.getElementById('PreLoading');
if (loading !== null) {
  loading.style.display = 'none';
}

// Register a service worker for PWA application
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
}
