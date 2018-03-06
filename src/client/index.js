import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from './redux/store';
import App from "./App";
import ErrorScreen from "./components/first-order/Error/ErrorScreen.react";

function AppMount() {
  return (
    <div className="adventure-tripr-app">
      <Provider store={store}>
        <App />
        <ErrorScreen />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppMount />, rootElement);
