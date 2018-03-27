import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export const EditExpensePage = ({
  startEditExpense,
  startRemoveExpense,
  history,
  expense
}) => {
  const onSubmit = async changedExpense => {
    await startEditExpense(expense.id, changedExpense);
    history.push("/");
  };

  const onRemove = async () => {
    await startRemoveExpense({ id: expense.id });
    history.push("/");
  };

  return (
    <div>
      <h1>Edit Expense</h1>
      {expense && <ExpenseForm expense={expense} onSubmit={onSubmit} />}
      {expense && <button onClick={onRemove}>Remove</button>}
      {!expense && <p>This expense does not exist!</p>}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, changedExpense) =>
    dispatch(startEditExpense(id, changedExpense)),
  startRemoveExpense: expense => dispatch(startRemoveExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
