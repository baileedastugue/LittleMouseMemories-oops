// this is the Root reducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import albumReducer from './albumReducer';
import pictureReducer from './pictureReducer';
import promptReducer from './promptReducer';

export default combineReducers({
     alert: alertReducer,
     album: albumReducer,
     auth: authReducer,
     picture: pictureReducer,
     prompt: promptReducer,
});
