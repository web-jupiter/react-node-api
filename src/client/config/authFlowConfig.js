import {TNC_STATEMENT} from "./constants";

/* Configuration for auth flow */

export const fieldStateConfig = {
  "SIGNUP" : {
    0: {
      fields: ["photo","email", "password", "submit"],
      submit: "Get Started",
      sideText: "Join the platform that makes your experience more discoverable.",
      headerText: "CREATE AN ACCOUNT"
    },
    1: {
      fields: ["country", "address", "city", "state", "zip", "phone", "submit"],
      submit: "Next",
      sideText: "Let's get you signed up.",
      headerText: "Location Info: "
    },
    2: {
      fields: ["website", "facebook", "instagram", "bio", "portfolio", "submit"],
      submit: "Sign up",
      sideText: "You're almost done",
      headerText: "Company Info: "
    }
  },

  "LOGIN" : {
    0: {
      fields: ["email", "password", "submit"],
      submit: "Login",
      sideText: "",
      headerText: "Sign In"
    }
  },

  "RESETPASSWORD": {
    0 :{
      fields: ["email", "password", "password", "submit"],
      submit: "Reset",
      sideText: "",
      headerText: "Change Password"
    }
  }
}

