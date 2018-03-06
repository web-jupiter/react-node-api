export const UPDATE_AUTH_FIELD_VALUE = "UPDATE_AUTH_FIELD_VALUE";

export const updateAuthFieldValueAction = payload => dispatch => {
  return dispatch({
    type: UPDATE_AUTH_FIELD_VALUE,
    payload
  })
}

export const UPDATE_TRIP_FIELD_VALUE = "UPDATE_TRIP_FIELD_VALUE";

export const updateTripFieldValueAction = payload => dispatch => {
  return dispatch({
    type: UPDATE_TRIP_FIELD_VALUE,
    payload
  })
}
