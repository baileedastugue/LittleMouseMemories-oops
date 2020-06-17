import { GET_PICTURES_SUCCESS, GET_PICTURES_FAIL } from '../actions/types';

const initialState = {
     pictures: [],
     picture: {},
     album: null,
     isLoading: true,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case GET_PICTURES_SUCCESS:
               return {
                    ...state,
                    pictures: action.payload,
                    album: action.payload.album,
                    isLoading: false,
               };
          case GET_PICTURES_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    isLoading: false,
               };
          default:
               return state;
     }
}
