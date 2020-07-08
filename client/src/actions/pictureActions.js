import axios from 'axios';
import { setAlert } from './alertActions';
import {
     GET_PICTURES_SUCCESS,
     GET_PICTURES_FAIL,
     ADD_PICTURE_SUCCESS,
     ADD_PICTURE_FAIL,
     DELETE_PICTURE_SUCCESS,
     DELETE_PICTURE_FAIL,
} from './types';
import { getAlbum, loadingPost } from './albumActions';

export const getPictures = (album_id) => async (dispatch) => {
     try {
          const res = await axios.get(`/api/pictures/album/${album_id}`);
          dispatch({
               type: GET_PICTURES_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: GET_PICTURES_FAIL,
               payload: {
                    msg: err.response.status.text,
                    status: err.response.status,
               },
          });
     }
};

export const addNewPicture = (album_id, formData) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'multipart/form-data',
               mode: 'no-cors',
          },
     };
     try {
          dispatch(loadingPost());
          const res = await axios.post(
               `/api/pictures/${album_id}`,
               formData,
               config
          );
          dispatch({
               type: ADD_PICTURE_SUCCESS,
               payload: res.data,
          });
          dispatch(getPictures(album_id));
          dispatch(getAlbum(album_id));
     } catch (err) {
          const errors = err.response;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: ADD_PICTURE_FAIL,
          });
     }
};

export const deletePicture = (picture_id, album_id) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          },
     };
     if (
          window.confirm(
               'Are you sure you want to delete this picture? This action cannot be undone'
          )
     ) {
          try {
               const res = await axios.delete(
                    `/api/pictures/${picture_id}`,
                    config
               );
               dispatch({
                    type: DELETE_PICTURE_SUCCESS,
                    payload: res.data,
               });
               dispatch(getAlbum(album_id));
               dispatch(getPictures(album_id));
          } catch (err) {
               const errors = err.response;
               if (errors) {
                    for (let i = 0; i < errors.length; i++) {
                         dispatch(setAlert(errors[i].msg, 'danger'));
                    }
               }
               dispatch({
                    type: DELETE_PICTURE_FAIL,
               });
          }
     }
};
