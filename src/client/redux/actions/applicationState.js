export const UPDATE_APPLICATION_STATE = "UPDATE_APPLICATION_STATE";

export const updateApplicationStateAction = payload => dispatch => {
  dispatch({
    type: UPDATE_APPLICATION_STATE,
    payload
  })
}