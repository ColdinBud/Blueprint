import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers/index";
import { sagas } from "./sagas/index";

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// create the store
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);

// export
export { store, history };