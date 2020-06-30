import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT_SUCCESS,
     CHANGE_PW_SUCCESS,
     CHANGE_PW_FAIL,
     DELETE_USER_SUCCESS,
     DELETE_USER_FAIL,
} from '../actions/types';

const initialState = {
     // get token from local storage
     token: localStorage.getItem('token'),
     isAuthenticated: null,
     isLoading: true,
     user: null,
};

export default function (state = initialState, action) {
     switch (action.type) {
          case CHANGE_PW_SUCCESS:
          case USER_LOADED:
               return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload,
               };
          case LOGIN_SUCCESS:
          case REGISTER_SUCCESS:
               localStorage.setItem('token', action.payload.token);
               return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    isLoading: true,
               };
          case DELETE_USER_FAIL:
          case CHANGE_PW_FAIL:
               return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: false,
               };
          case DELETE_USER_SUCCESS:
          case LOGIN_FAIL:
          case LOGOUT_SUCCESS:
          case REGISTER_FAIL:
          case AUTH_ERROR:
               localStorage.removeItem('token');
               return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
               };
          default:
               return state;
     }
}
