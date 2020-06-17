import axios from 'axios';
import { setAlert } from './alertActions';
import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     //  GET_ALBUMS,
     //  DELETE_ALBUM_SUCCESS,
     //  DELETE_ALBUM_FAIL,
} from './types';

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
