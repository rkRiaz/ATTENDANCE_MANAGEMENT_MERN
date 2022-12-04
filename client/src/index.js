import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastProvider } from 'react-toast-notifications'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={4000}>
          <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
