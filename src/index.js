import reactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { init } from './services/ErrorLoger';

init();

reactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
