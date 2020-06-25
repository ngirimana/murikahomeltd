import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import "./index.scss";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

import signupReducer from "./store/reducers/auth/signup.js";
import loginReducer from "./store/reducers/auth/signin.js";
import houseReducer from "./store/reducers/house/house.js";
import landingPage from "./store/reducers/landing-page/landing";
import searchReducer from "./store/reducers/search/search-reducer";

import { watchSignup, watchLogin, watchAddHouse } from "./store/sagas/index.js";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  house: houseReducer,
  featuredHouses: landingPage,
  searchHouses: searchReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchSignup);
sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchAddHouse);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
