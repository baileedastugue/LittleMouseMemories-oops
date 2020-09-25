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
     ALBUM_AUTH_SUCCESS,
     ALBUM_AUTH_FAIL,
     CHANGE_ALBUM_NAME_SUCCESS,
     CHANGE_ALBUM_NAME_FAIL,
     CHANGE_ALBUM_PW_SUCCESS,
     CHANGE_ALBUM_PW_FAIL,
     GET_ALBUM_SETTINGS_SUCCESS,
     GET_ALBUM_SETTINGS_FAIL,
     LOADING_POST,
} from './types';

export const getAllAlbums = () => async (dispatch) => {
     try {
          dispatch({ type: LOADING_POST });
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

export const loadingPost = () => (dispatch) => {
     dispatch({ type: LOADING_POST });
};

export const addNewAlbum = ({ title, passwordRequired, password }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     if (!passwordRequired) {
          password = '';
     }
     const body = JSON.stringify({ title, passwordRequired, password });
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

export const getAlbumSettings = (album_id) => async (dispatch) => {
     try {
          const res = await axios.get(`/api/albums/${album_id}`);

          dispatch({
               type: GET_ALBUM_SETTINGS_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          const errors = err.response.data;
          if (errors.length > 0) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
                    console.log(errors[i].msg);
               }
          }
          dispatch({
               type: GET_ALBUM_SETTINGS_FAIL,
          });
     }
};

export const getAlbum = (album_id) => async (dispatch) => {
     try {
          const res = await axios.get(`/api/albums/${album_id}`);
          let posts = [];
          res.data[0].pictures.map((picture) => posts.push(picture));
          res.data[0].prompts.map((prompt) => posts.push(prompt));
          posts.sort((a, b) => (a.dateUploaded < b.dateUploaded ? 1 : -1));
          dispatch({
               type: GET_ALBUM_SUCCESS,
               payload: { posts: posts, data: res.data },
          });
     } catch (err) {
          const errors = err.response.data;
          if (errors.length > 0) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
                    console.log(errors[i].msg);
               }
          }
          dispatch({
               type: GET_ALBUM_FAIL,
          });
     }
};

export const albumAuth = ({ albumId, password }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ albumId, password });

     try {
          const res = await axios.post(
               `/api/albums/private/${albumId}`,
               body,
               config
          );
          dispatch({
               type: ALBUM_AUTH_SUCCESS,
               payload: res.data,
          });
          dispatch(getAlbum(albumId));
     } catch (err) {
          dispatch({
               type: ALBUM_AUTH_FAIL,
          });
          dispatch(getAlbum(albumId));
          const errors = err.response.data.errors;
          if (errors) {
               errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
               );
          }
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
               const errors = err.response.data;
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

export const albumNameChange = (album_id, { newTitle }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };

     const body = JSON.stringify({ newTitle });
     try {
          await axios.put(`/api/albums/${album_id}`, body, config);
          dispatch({
               type: CHANGE_ALBUM_NAME_SUCCESS,
          });
          dispatch(getAllAlbums());
          dispatch(getAlbumSettings(album_id));
          dispatch(setAlert('Album name has been successfully updated'));
     } catch (err) {
          const errors = err.response.data;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: CHANGE_ALBUM_NAME_FAIL,
          });
     }
};

export const albumPasswordChange = (
     album_id,
     { newPassword, passwordRequired }
) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ newPassword, passwordRequired });
     try {
          await axios.put(`/api/albums/password/${album_id}`, body, config);
          dispatch({
               type: CHANGE_ALBUM_PW_SUCCESS,
          });
          dispatch(getAllAlbums());
          dispatch(
               setAlert(
                    'Album password settings have been successfully updated'
               )
          );
     } catch (err) {
          const errors = err.response.data;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: CHANGE_ALBUM_PW_FAIL,
          });
     }
};
