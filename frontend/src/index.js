import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducers } from './reducers/reducers';
// redux persist
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// react router
import { BrowserRouter } from 'react-router-dom';
// css
import "./assets/css/spartacus-style.css";
// app main components
import App from './layout/App';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, logger));

const persistor = persistStore(store);

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
