import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { editExpenseAsync, removeExpenseAsync } from "../actions/expenses";

export const EditExpensePage = ({
  editExpenseAsync,
  removeExpenseAsync,
  history,
  expense
}) => {
  const onSubmit = async changedExpense => {
    await editExpenseAsync(expense.id, changedExpense);
    history.push("/");
  };

  const onRemove = async () => {
    await removeExpenseAsync({ id: expense.id });
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
  editExpenseAsync: (id, changedExpense) =>
    dispatch(editExpenseAsync(id, changedExpense)),
  removeExpenseAsync: expense => dispatch(removeExpenseAsync(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
