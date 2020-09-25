// entry point to our redux store
// holds the whole state tree of your application

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

const initialState = {};

const middleware = [thunk];

const store = createStore(
     rootReducer,
     initialState,
     compose(applyMiddleware(...middleware))
);

export default store;
