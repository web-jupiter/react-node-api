import { createSelector } from "reselect";
import {getFieldsForCurrentState} from "../helpers/AT-helpers";

const getAuthState = (state) => state.forms.AuthState;
const getAuthStage = (state) => state.forms.AuthStage;

const getSignupFormFields = createSelector([getAuthState, getAuthStage], (authState,authStage) => {
  return getFieldsForCurrentState(authState, authStage);
})

export default getSignupFormFields;
