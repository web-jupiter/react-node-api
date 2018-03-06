export const SUBMIT_SIGNUP_FORM = "SUBMIT_SIGNUP_FORM";

export const submitSignupFormAction = payload => dispatch => {
  dispatch({
    type: SUBMIT_SIGNUP_FORM,
    payload
  })
}


export const SHOW_SIGNUP_FORM = "SHOW_SIGNUP_FORM";

export const showSignupFormAction = payload => dispatch => {
  dispatch({
    type: SHOW_SIGNUP_FORM,
    payload
  })
}