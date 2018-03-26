import "normalize.css/normalize.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { addExpense, startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import { selectExpenses } from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const state = store.getState();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const appRoot = document.getElementById("app");

ReactDOM.render(<p>Loading...</p>, appRoot);

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, appRoot);
});
