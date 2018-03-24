import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions/expenses";

export const EditExpensePage = ({
  editExpense,
  removeExpense,
  history,
  expense
}) => {
  const onSubmit = changedExpense => {
    editExpense(expense.id, changedExpense);
    history.push("/");
  };

  const onRemove = () => {
    removeExpense({ id: expense.id });
    history.push("/");
  };

  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm expense={expense} onSubmit={onSubmit} />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editExpense: (id, changedExpense) =>
    dispatch(editExpense(id, changedExpense)),
  removeExpense: expense => dispatch(removeExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
