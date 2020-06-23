import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT_SUCCESS,
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
                    isloading: false,
               };
          case LOGIN_FAIL:
          case LOGOUT_SUCCESS:
          case REGISTER_FAIL:
          case AUTH_ERROR:
               localStorage.removeItem('token');
               console.log(123);
               return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    isloading: false,
               };
          default:
               return state;
     }
}
