import axios from 'axios';
import { setAlert } from './alertActions';
import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     GET_ALBUMS_SUCCESS,
     GET_ALBUMS_FAIL,
     GET_ALBUM_SUCCESS,
     GET_ALBUM_FAIL,
     DELETE_ALBUM_SUCCESS,
     DELETE_ALBUM_FAIL,
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
          dispatch(getAllAlbums());
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

export const getAlbum = (id) => async (dispatch) => {
     try {
          // console.log('line 62 in aA');
          const res = await axios.get(`/api/albums/${id}`);
          // console.log(res.data);
          dispatch({
               type: GET_ALBUM_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: GET_ALBUM_FAIL,
               payload: {
                    msg: err.response.status.text,
                    status: err.response.status,
               },
          });
     }
};

export const deleteAlbum = (id) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          },
     };
     if (
          window.confirm(
               'Are you sure you want to delete this album? This action cannot be undone and all posts within the album will be permanently deleted'
          )
     ) {
          try {
               const res = await axios.delete(`/api/albums/${id}`, config);
               dispatch({
                    type: DELETE_ALBUM_SUCCESS,
                    payload: res.data,
               });
               dispatch(getAllAlbums());
               dispatch(setAlert('This album has been permanentely deleted'));
          } catch (err) {
               const errors = err.response;
               if (errors) {
                    for (let i = 0; i < errors.length; i++) {
                         dispatch(setAlert(errors[i].msg, 'danger'));
                    }
               }
               dispatch({
                    type: DELETE_ALBUM_FAIL,
               });
          }
     }
};
