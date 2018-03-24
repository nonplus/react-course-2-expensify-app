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

const rent = store.dispatch(
  addExpense({
    description: "Rent",
    amount: 80000,
    createdAt: 1000
  })
);

store.dispatch(
  addExpense({
    description: "Water Bill",
    amount: 4500,
    createdAt: 1200
  })
);

const lunch = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 500,
    createdAt: 2000
  })
);

// store.dispatch(setTextFilter("rent"));

// setTimeout(() => {
//   store.dispatch(setTextFilter(""));
// }, 3000);

const state = store.getState();
console.log(selectExpenses(state.expenses, state.filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
