import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     GET_ALBUMS_SUCCESS,
     GET_ALBUMS_FAIL,
     GET_ALBUM_SUCCESS,
     GET_ALBUM_FAIL,
     DELETE_ALBUM_SUCCESS,
     DELETE_ALBUM_FAIL,
     DELETE_PICTURE_SUCCESS,
     DELETE_PICTURE_FAIL,
     ALBUM_AUTH_SUCCESS,
     ALBUM_AUTH_FAIL,
     CHANGE_ALBUM_NAME_SUCCESS,
     CHANGE_ALBUM_NAME_FAIL,
     CHANGE_ALBUM_PW_SUCCESS,
     CHANGE_ALBUM_PW_FAIL,
     CHANGE_PW_FAIL,
     GET_ALBUM_SETTINGS_SUCCESS,
     GET_ALBUM_SETTINGS_FAIL,
     LOADING_POST,
} from '../actions/types';

const initialState = {
     albums: [],
     album: [],
     validAlbum: true,
     isLoading: true,
     authorized: null,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case LOADING_POST:
               return {
                    ...state,
                    isLoading: true,
               };
          case ADD_ALBUM_SUCCESS:
               return {
                    validAlbum: true,
                    ...state,
                    ...action.payload,
                    isLoading: false,
               };
          case GET_ALBUMS_SUCCESS:
               return {
                    ...state,
                    albums: action.payload,
                    isLoading: false,
               };
          case GET_ALBUM_SETTINGS_SUCCESS:
               return {
                    ...state,
                    album: action.payload,
                    isLoading: false,
               };
          case GET_ALBUM_SUCCESS:
               return {
                    ...state,
                    album: action.payload.posts,
                    albums: action.payload.data,
                    isLoading: false,
                    validAlbum: true,
               };
          case ALBUM_AUTH_SUCCESS:
               return {
                    ...state,
                    isLoading: true,
                    authorized: true,
               };
          case CHANGE_ALBUM_PW_SUCCESS:
          case CHANGE_ALBUM_NAME_SUCCESS:
          case DELETE_PICTURE_SUCCESS:
          case DELETE_ALBUM_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
               };
          case CHANGE_ALBUM_PW_FAIL:
          case CHANGE_PW_FAIL:
          case CHANGE_ALBUM_NAME_FAIL:
          case ALBUM_AUTH_FAIL:
          case DELETE_PICTURE_FAIL:
          case DELETE_ALBUM_FAIL:
          case ADD_ALBUM_FAIL:
          case GET_ALBUMS_FAIL:
          case GET_ALBUM_SETTINGS_FAIL:
          case GET_ALBUM_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    isLoading: false,
                    validAlbum: false,
               };

          default:
               return state;
     }
}
