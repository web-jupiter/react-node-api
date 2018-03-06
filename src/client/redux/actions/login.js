import axios from 'axios';

export const SUBMIT_LOGIN_FORM = "SUBMIT_LOGIN_FORM";
export const SHOW_LOGIN_FORM = "SHOW_LOGIN_FORM";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const autoLogin = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {type: LOGIN_SUCCESS};
  }
    return { type: LOGOUT };
}

export const submitLoginFormAction = payload => dispatch => {
  dispatch({
    type: SUBMIT_LOGIN_FORM,
    payload
  })
}

export const showLoginFormAction = payload => dispatch => {
  dispatch({
    type: SHOW_LOGIN_FORM,
    payload
  })
}

export const loginUser = options => dispatch => axios
  .post("https://fototripr.com/api/v1/Users/Authenticate", options)
  .then((response) => {
    localStorage.setItem("token", response.data.result.token);
    return dispatch({ type: LOGIN_SUCCESS });
  })
  .catch(err => dispatch({type: LOGIN_ERROR, payload: err.response.data.message}));

export const logoutUser = () => {
  localStorage.clear("token");
  return dispatch({ type: LOGOUT});
}