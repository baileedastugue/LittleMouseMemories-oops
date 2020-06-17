import axios from 'axios';
import { setAlert } from './alertActions';
import {
     //  ADD_ALBUM_SUCCESS,
     //  ADD_ALBUM_FAIL,
     GET_PICTURES_SUCCESS,
     GET_PICTURES_FAIL,
     //  DELETE_ALBUM_SUCCESS,
     //  DELETE_ALBUM_FAIL,
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
