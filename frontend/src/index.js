import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './layout/App';
import { BrowserRouter } from 'react-router-dom'

import "./assets/spartacus-style.css";

ReactDOM.render((
    <BrowserRouter>
        <App/ >
    </BrowserRouter>), 
    document.getElementById('root')); 
registerServiceWorker();


