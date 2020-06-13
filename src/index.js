import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import './index.css';

const app = (
  <Provider store={store}>
    <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js%22%3E"/>
    <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-firestore.js%22%3E"/>
    <App />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();