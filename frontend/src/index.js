import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import App from './layout/App';
import { BrowserRouter } from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import "./assets/spartacus-style.css";
import { formInput, usersReducer, servicesReducer, userProfileReducer, userRecordsReducer } from './redux/reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  formInput,
  usersReducer,
  servicesReducer,
  userRecordsReducer,
  userProfileReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, logger));

const persistor = persistStore(store)

ReactDOM.render((
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>  
      </Provider>  ), 
    document.getElementById('root')); 
registerServiceWorker();