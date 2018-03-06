export const ADD_TRIP = "ADD_TRIP";

export const addTripAction = payload => dispatch => {
  return dispatch({
    type: ADD_TRIP,
    payload
  })
}

export const EDIT_TRIP = "EDIT_TRIP";

export const editTripAction = payload => dispatch => {
  return dispatch({
    type: EDIT_TRIP,
    payload
  })
}
