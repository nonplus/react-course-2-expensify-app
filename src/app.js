import "normalize.css/normalize.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { addExpense, setExpenseAsync } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import { selectExpenses } from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";

const store = configureStore();

const state = store.getState();

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

ReactDOM.render(<p>Loading...</p>, appRoot);

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    console.log("logged in", user);
    store.dispatch(login(user.uid));
    await store.dispatch(setExpenseAsync());
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  } else {
    console.log("logged out");
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
