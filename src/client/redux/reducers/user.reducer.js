import {
  SUBMIT_LOGIN_FORM,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SUBMIT_SIGNUP_FORM,
  UPDATE_APPLICATION_STATE
} from "../actions";

import {
  getNextAuthStageValue,
  getFieldsForPage,
  getHeaderForPage
} from "../../helpers/AT-helpers";

export const user = (state = {}, action) => {
  
  switch(action.type) {
    case SUBMIT_SIGNUP_FORM : {
      const {AuthStage, AuthState} = action.payload;
      const newValue = getNextAuthStageValue(AuthStage, AuthState);
      if(!newValue){
        return {
          ...state,
          isLoggedIn: true
        }
      }
      return {...state};

    }
    case SUBMIT_LOGIN_FORM : {
      return {
        ...state,
        isLoggedIn: true
      }
    }
    case LOGIN_REQUEST: 
      return {
        ...state,
      }
    case LOGIN_SUCCESS: 
      return {
        ...state,
        isLoggedIn: true,
        isLoginError: null,
      }
    case LOGIN_ERROR: 
      return {
        ...state,
        isLoggedIn: false,
        isLoginError: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoginError: null,
      }
    case UPDATE_APPLICATION_STATE : {
      const {selected} = action.payload;
      return {
        ...state,
        formState: selected,
        fields: getFieldsForPage(selected),
        pageHeader: getHeaderForPage(selected)
      }
    }
    default: {
      return state;
    }
  }
};
