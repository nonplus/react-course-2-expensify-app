import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { selectExpenses } from "../selectors/expenses";
import { selectExpensesTotal } from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formatedCount = numeral(expenseCount).format("0,0");
  const formatedTotal = numeral(expensesTotal / 100).format("$0,0.[99]");
  return (
    <div>
      <h1>
        You're viewing {formatedCount} {expenseWord} totaling {formatedTotal}
      </h1>
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
