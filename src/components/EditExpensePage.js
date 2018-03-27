import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { editExpense, startRemoveExpense } from "../actions/expenses";

export const EditExpensePage = ({
  editExpense,
  startRemoveExpense,
  history,
  expense
}) => {
  const onSubmit = changedExpense => {
    editExpense(expense.id, changedExpense);
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
  editExpense: (id, changedExpense) =>
    dispatch(editExpense(id, changedExpense)),
  startRemoveExpense: expense => dispatch(startRemoveExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
