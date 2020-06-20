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

export const getPictures = (id) => async (dispatch) => {
     try {
          const res = await axios.get(`/api/pictures/album/${id}`);
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

export const addNewPicture = (id, { image, caption }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          },
     };
     const body = JSON.stringify({ image, caption });
     try {
          const res = await axios.post(`/api/pictures/${id}`, body, config);
          dispatch({
               type: ADD_PICTURE_SUCCESS,
               payload: res.data,
          });
          dispatch(getPictures(id));
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
     try {
          const res = await axios.delete(`/api/pictures/${picture_id}`, config);
          dispatch({
               type: DELETE_PICTURE_SUCCESS,
               payload: res.data,
          });
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
};
