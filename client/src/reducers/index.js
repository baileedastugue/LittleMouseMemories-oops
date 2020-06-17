// this is the Root reducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';
// import errorReducer from './errorReducer';
import alertReducer from './alertReducer';

export default combineReducers({
     alert: alertReducer,
     //  error: errorReducer,
     auth: authReducer,
     //  root: rootReducer,
});
