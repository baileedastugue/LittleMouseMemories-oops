import {
     ADD_ALBUM_SUCCESS,
     ADD_ALBUM_FAIL,
     //  DELETE_ALBUM_SUCCESS,
     //  DELETE_ALBUM_FAIL,
} from '../actions/types';

const initialState = {
     albums: [],
     album: null,
     isLoading: true,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case ADD_ALBUM_SUCCESS:
               return {
                    ...state,
                    ...action.payload,
                    isLoading: false,
               };
          case ADD_ALBUM_FAIL:
               return {
                    ...state,
               };
          default:
               return state;
     }
}
