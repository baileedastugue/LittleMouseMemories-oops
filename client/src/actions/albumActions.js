import axios from 'axios';
import { setAlert } from './alertActions';
import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     GET_ALBUMS_SUCCESS,
     GET_ALBUMS_FAIL,
     //  DELETE_ALBUM_SUCCESS,
     //  DELETE_ALBUM_FAIL,
} from './types';

export const getAllAlbums = () => async (dispatch) => {
     try {
          // knows which album to load from the token sent that contains the user id
          const res = await axios.get('api/albums/');
          dispatch({
               type: GET_ALBUMS_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: GET_ALBUMS_FAIL,
               payload: {
                    msg: err.response.status.text,
                    status: err.response.status,
               },
          });
     }
};

export const addNewAlbum = ({ title }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ title });
     try {
          const res = await axios.post('/api/albums/', body, config);
          dispatch({
               type: ADD_ALBUM_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: ADD_ALBUM_FAIL,
          });
     }
};

// export const deleteAlbum = ({ id }) => async (dispatch) => {
//   const config = {
//        headers: {
//             'Content-Type': 'application/json',
//        },
//   };
//   const body = JSON.stringify({ id });
//   try {
//        const res = await axios.post('/api/albums/`, body, config);
//        dispatch({
//             type: ADD_ALBUM_SUCCESS,
//             payload: res.data,
//        });
//   } catch (err) {
//        const errors = err.response.data.errors;
//        if (errors) {
//             for (let i = 0; i < errors.length; i++) {
//                  dispatch(setAlert(errors[i].msg, 'danger'));
//             }
//        }
//        dispatch({
//             type: ADD_ALBUM_FAIL,
//        });
//   }
// };
