import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // TODO: Delete this
import { Provider } from 'react-redux';
import store from './store/store'; // Path to your store
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);