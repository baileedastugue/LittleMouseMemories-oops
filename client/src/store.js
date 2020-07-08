// entry point to our redux store
// holds the whole state tree of your application

import { createStore, applyMiddleware, compose } from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

const initialState = {};

const middleware = [thunk];

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
     rootReducer,
     initialState,
     compose(
          // window.__REDUX_DEVTOOLS_EXTENSION__ &&
          // window.__REDUX_DEVTOOLS_EXTENSION__(),
          applyMiddleware(...middleware)
     )
);

// store.dispatch

// connectRouter(history)
// manipulate router history in
export default store;
