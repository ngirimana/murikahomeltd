import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import './index.scss';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import signupReducer from './store/reducers/auth/signup.jsx';
import loginReducer from './store/reducers/auth/signin.jsx'
import { watchSignup, watchLogin } from './store/sagas/index.jsx';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null ||
  compose;

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer
});
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchSignup);
sagaMiddleware.run(watchLogin);


ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
