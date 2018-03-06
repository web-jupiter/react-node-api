
export const AUTH_STATE_VARIANTS = Object.freeze({
  SIGN_UP : "SIGNUP",
  LOGIN : "LOGIN",
  RESET : "RESETPASSWORD"
})
export const AUTH_STAGE = Object.freeze({
  0: "ADD_NAME",
  1: "ADD_LOCATION",
  2: "ADD_COMPANY_INFO"
})

export const GET_MAX_VARIANTS = Object.freeze({
  "SIGNUP" : 3,
  "LOGIN" : 1,
  "RESETPASSWORD" : 1
});

//export const STATE_SIDEBAR = ["profileEdit", "addTour", "updateTour", "dashboard"];
export const STATE_SIDEBAR = ["addTour", "updateTour"];
export const InitialFormState = 0;
export const InitialAuthStage = 0;
export const InitialAuthState = AUTH_STATE_VARIANTS.SIGN_UP;
export const SIGNUP_HEADER_TEXT = "SIGN UP";
export const LOGIN_HEADER_TEXT = "SIGN IN";
export const APPLICATION_ERROR = "APPLICATION_ERROR";
export const XHR_MAX_RETRY = 2;
export const INITIAL_CONFIG = "INITIAL_CONFIG";
export const LOADING = "LOADING";
export const SIGN_IN_PROMPT = "Already have an account ?";
export const SIGNUP_PROMPT = "Create an account?";
export const TNC_STATEMENT = "I have read and accept the FotoTripr tour host Terms and Conditions";