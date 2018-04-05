import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { selectExpenses } from "../selectors/expenses";
import { selectExpensesTotal } from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formatedCount = numeral(expenseCount).format("0,0");
  const formatedTotal = numeral(expensesTotal / 100).format("$0,0.[99]");
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          You&quot;re viewing <span>{formatedCount}</span> {expenseWord}{" "}
          totaling <span>{formatedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
