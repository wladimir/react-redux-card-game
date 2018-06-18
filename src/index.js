import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import combineReducers from "./reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const logger = createLogger();

const store = createStore(combineReducers, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
