import {
  ADD_TRIP,
  EDIT_TRIP
} from "../actions";


export const trips = (state = {}, action) => {
  
  switch(action.type) {
    case ADD_TRIP : {
      return {
        ...state,
        payload
      }
    }
    case EDIT_TRIP : {
      return {
        ...state,
        payload
      }
    }
    default: {
      return state;
    }
  }
};
