
import { combineReducers } from "redux";
import { fields } from "./fields.reducer";
import { config } from "./config.reducer";
import { forms } from "./form.reducer";
import { authForms } from "./authForms.reducer";
import { loading } from "./loading.reducer";
import { applicationError } from "./application-error.reducer";
import { user } from "./user.reducer";
import { trips } from "./trips.reducer";

export default combineReducers({
  fields,
  config,
  authForms,
  forms,
  loading,
  applicationError,
  user,
  trips
});
