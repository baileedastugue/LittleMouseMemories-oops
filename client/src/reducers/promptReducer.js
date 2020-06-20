import {
     GET_PROMPTS_SUCCESS,
     GET_PROMPTS_FAIL,
     // ADD_PICTURE_SUCCESS,
     // ADD_PICTURE_FAIL,
     DELETE_PROMPT_SUCCESS,
     DELETE_PROMPT_FAIL,
} from '../actions/types';

const initialState = {
     prompts: [],
     prompt: {},
     album: null,
     isLoading: true,
     error: {},
};

export default function (state = initialState, action) {
     switch (action.type) {
          case DELETE_PROMPT_SUCCESS:
          //  case ADD_PICTURE_SUCCESS:
          case GET_PROMPTS_SUCCESS:
               return {
                    ...state,
                    prompts: action.payload,
                    album: action.payload.album,
                    isLoading: false,
               };
          case DELETE_PROMPT_FAIL:
          //  case ADD_PICTURE_FAIL:
          case GET_PROMPTS_FAIL:
               return {
                    ...state,
                    error: action.payload,
                    isLoading: false,
               };
          default:
               return state;
     }
}
