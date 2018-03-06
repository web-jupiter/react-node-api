import {
  SUBMIT_LOGIN_FORM,
  SUBMIT_SIGNUP_FORM,
  UPDATE_AUTH_FIELD_VALUE,
  SHOW_LOGIN_FORM,
  SHOW_SIGNUP_FORM
} from "../actions";
import {
  getNextAuthStageValue,
  getFieldsForCurrentState,
  getSubmitTextForCurrentState,
  getHeaderTextForCurrentState
} from "../../helpers/AT-helpers";

import {
  InitialAuthStage,
  AUTH_STATE_VARIANTS,
  AUTH_STAGE
} from "../../config/constants";

export const authForms = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_AUTH_FIELD_VALUE: {
      const { name, value } = action.payload;
      const { fieldValues } = state;
      return {
        ...state,
        fieldValues: {
          ...fieldValues,
          [name] : value
        }
      }
    }
    case SUBMIT_SIGNUP_FORM : {
      const {AuthStage, AuthState} = state;
      const newValue = getNextAuthStageValue(AuthStage, AuthState);
      return {
        ...state,
          AuthStage: newValue,
          fields: getFieldsForCurrentState(AuthState, newValue),
          submitText: getSubmitTextForCurrentState(AuthState, newValue),
          headerText: getHeaderTextForCurrentState(AuthState, newValue),
      }
    }
    case SUBMIT_LOGIN_FORM : {
      const {AuthStage, AuthState} = state;
      const newValue = getNextAuthStageValue(AuthStage, AuthState);
      return {
        ...state,
          AuthStage: newValue,
          fields: getFieldsForCurrentState(AuthState, newValue),
          submitText: getSubmitTextForCurrentState(AuthState, newValue),
          headerText: getHeaderTextForCurrentState(AuthState, newValue),
      }
    }
    case SHOW_LOGIN_FORM :{
      const newAuthState = AUTH_STATE_VARIANTS.LOGIN;
      const newAuthStage = AUTH_STAGE[InitialAuthStage];
      return {
        ...state,
        AuthState: newAuthState,
        AuthStage: newAuthStage,
        fields: getFieldsForCurrentState(newAuthState, newAuthStage),
        submitText: getSubmitTextForCurrentState(newAuthState, newAuthStage),
        headerText: getHeaderTextForCurrentState(newAuthState, newAuthStage),
      }
    }
    case SHOW_SIGNUP_FORM :{
      const newAuthState = AUTH_STATE_VARIANTS.SIGN_UP;
      const newAuthStage = AUTH_STAGE[InitialAuthStage];
      return {
        ...state,
        AuthState: newAuthState,
        AuthStage: newAuthStage,
        fields: getFieldsForCurrentState(newAuthState, newAuthStage),
        submitText: getSubmitTextForCurrentState(newAuthState, newAuthStage),
        headerText: getHeaderTextForCurrentState(newAuthState, newAuthStage),
      }
    }
    default: {
      return state;
    }
  }
};
