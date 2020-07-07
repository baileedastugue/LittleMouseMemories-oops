import {
     GET_PICTURES_SUCCESS,
     GET_PICTURES_FAIL,
     ADD_PICTURE_SUCCESS,
     ADD_PICTURE_FAIL,
     DELETE_PICTURE_SUCCESS,
     DELETE_PICTURE_FAIL,
} from '../actions/types';

const initialState = {
     picture: {},
     pictureAdded: null,
     album: null,
     pictureLoading: false,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case ADD_PICTURE_SUCCESS:
               return {
                    ...state,
                    picture: action.payload,
                    pictureAdded: true,
                    album: action.payload.album,
                    pictureLoading: true,
               };
          case DELETE_PICTURE_SUCCESS:
          case GET_PICTURES_SUCCESS:
               return {
                    ...state,
                    pictures: action.payload,
                    album: action.payload.album,
                    pictureLoading: false,
               };
          case DELETE_PICTURE_FAIL:
          case ADD_PICTURE_FAIL:
          case GET_PICTURES_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    pictureLoading: false,
               };
          default:
               return state;
     }
}
