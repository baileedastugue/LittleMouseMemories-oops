import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

// actions contain type and payload, which is the data
export default function (state = initialState, action) {
     switch (action.type) {
          case SET_ALERT:
               // state is immutable so you need to include any state that is already there
               // aka use the spread operator to copy and then add the new alert
               return [...state, action.payload];
          // payload will have .msg, .id, and an alert type
          case REMOVE_ALERT:
               // remove a specific alert by its ID
               return state.filter((alert) => alert.id !== action.payload);
          // payload in this case is the ID
          default:
               return state;
     }
}
