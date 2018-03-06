import {UPDATE_FIELD_DATA} from "../actions";

import { LOADING, APPLICATION_ERROR } from "../../config/constants";

export const loading = (state = false, action) => {
  switch (action.type) {
    case LOADING: {
      return true;
    }
    case APPLICATION_ERROR:{
      return false;
    }
    default: {
      return state;
    }
  }
};
