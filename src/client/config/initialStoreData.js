import {
  AUTH_STAGE,
  InitialAuthStage,
  InitialAuthState,
  InitialFormState
} from "./constants";
import { 
  getFieldsForCurrentState,
  getSubmitTextForCurrentState,
  getHeaderTextForCurrentState,
  getFieldsForPage,
  getHeaderForPage
} from "../helpers/AT-helpers";



const initialData = {
  loading: false,
  applicationError: false,
  authForms: {
    /** Signup, login or reset */
    AuthState: InitialAuthState,
    /** fields to show (configurable) */
    fields: getFieldsForCurrentState(InitialAuthState, AUTH_STAGE[InitialAuthStage]),
    submitText: getSubmitTextForCurrentState(InitialAuthState, AUTH_STAGE[InitialAuthStage]),
    headerText: getHeaderTextForCurrentState(InitialAuthState, AUTH_STAGE[InitialAuthStage]),
    /** 
     * what stage of auth flow user is on.Values could be 
     * 0-2 => signup
     * 0 => login
     * 0 => reset
    */
    AuthStage: AUTH_STAGE[InitialAuthStage],
    fieldValues: {}
  },
  /**
   * If user is logged in save all user related data here
   */
  user: {
    /** If user is logged in */
    isLoggedIn: false,
    savedTrips: [],
    isTripBeingEdited: false,
    formState: InitialFormState,
    fields: getFieldsForPage(InitialFormState),
    pageHeader: getHeaderForPage(InitialFormState),
    fieldValues: {}
  }
};

export default initialData;