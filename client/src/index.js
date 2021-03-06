import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth } from "./auth/auth";
import { Time } from "./time/time";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth>
        <Time>
          <App />
        </Time>
      </Auth>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
