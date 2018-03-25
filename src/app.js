import "normalize.css/normalize.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { addExpense } from "./actions/expenses";
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

ReactDOM.render(jsx, document.getElementById("app"));
