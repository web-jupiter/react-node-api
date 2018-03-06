import { APPLICATION_ERROR } from "../../config/constants";

export const applicationError = (state = null, action) => {
  switch (action.type) {
    case APPLICATION_ERROR: {
      return {
        code: action.payload.code
      };
    }
    default: {
      return state;
    }
  }
};
