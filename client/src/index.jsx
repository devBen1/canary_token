import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './component/App';
import "react-toastify/dist/ReactToastify.css";


render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,

  document.getElementById('root'),
);
