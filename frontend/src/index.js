import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import App from './layout/App';
import { BrowserRouter } from 'react-router-dom'

import "./assets/spartacus-style.css";
import { formAction, requestMembersRegistry, requestServicesRegistry, userProfile } from './redux/reducers';

const rootReducers = combineReducers({
  formAction,
  requestMembersRegistry,
  requestServicesRegistry,
  userProfile,
})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>  
    </BrowserRouter>), 
    document.getElementById('root')); 
registerServiceWorker();


