import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';

import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     AUTH_ERROR,
     USER_LOADED,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT_SUCCESS,
     CHANGE_PW_SUCCESS,
     CHANGE_PW_FAIL,
     DELETE_USER_SUCCESS,
     DELETE_USER_FAIL,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
     if (localStorage.token) {
          setAuthToken(localStorage.token);
     }
     try {
          const res = await axios.get('/api/auth');
          dispatch({
               type: USER_LOADED,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: AUTH_ERROR,
          });
     }
};

// Register user
export const register = ({ firstName, lastName, email, password }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ firstName, lastName, email, password });
     try {
          const res = await axios.post('api/users', body, config);
          dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data,
          });
          dispatch(loadUser());
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
               );
          }
          dispatch({
               type: REGISTER_FAIL,
          });
     }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ email, password });
     try {
          const res = await axios.post('/api/auth', body, config);
          dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data,
          });

          dispatch(loadUser());
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
               );
          }
          dispatch({
               type: LOGIN_FAIL,
          });
     }
};

export const logout = () => (dispatch) => {
     dispatch({
          type: LOGOUT_SUCCESS,
     });
};

export const changePw = ({ oldPassword, newPassword, newPassword2 }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ oldPassword, newPassword, newPassword2 });
     try {
          const res = await axios.put('/api/auth/password', body, config);
          dispatch({
               type: CHANGE_PW_SUCCESS,
               payload: res.data,
          });
          dispatch(setAlert('Password has been successfully changed'));
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
               );
          }
          dispatch({
               type: CHANGE_PW_FAIL,
          });
     }
};

export const deleteAccount = () => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     if (
          window.confirm(
               'Are you sure you want to delete your account? This action cannot be undone and all albums and their contents will be permanently deleted'
          )
     ) {
          try {
               const res = await axios.delete('/api/auth');
               dispatch({
                    type: DELETE_USER_SUCCESS,
               });
               dispatch(setAlert('Your account has been permanently deleted'));
          } catch (err) {
               const errors = err.response.data;
               if (errors) {
                    for (let i = 0; i < errors.length; i++) {
                         dispatch(setAlert(errors[i].msg, 'danger'));
                    }
               }
               dispatch({
                    type: DELETE_USER_FAIL,
               });
          }
     }
};
