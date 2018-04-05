import React from "react";
import { connect } from "react-redux";
import { selectExpenses } from "../selectors/expenses";
import ExpenseListItem from "./ExpenseListItem";

export const ExpenseList = ({ expenses }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="mobile-only">Expenses</div>
      <div className="desktop-only">Expense</div>
      <div className="desktop-only">Amount</div>
    </div>
    <div className="list-body">
      {expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses.</span>
        </div>
      ) : (
        expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
