import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { setExpenseAsync } from "./actions/expenses";
import { firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";
import { LoadingPage } from "./components/LoadingPage";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, appRoot);
    hasRendered = true;
  }
};

const appRoot = document.getElementById("app");

ReactDOM.render(<LoadingPage />, appRoot);

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    console.log("logged in", user);
    store.dispatch(login(user.uid));
    await store.dispatch(setExpenseAsync());
    renderApp();
    if (history.location.pathname === "/login") {
      history.push("/");
    }
  } else {
    console.log("logged out");
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
