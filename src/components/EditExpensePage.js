import React from "react";
import { connect } from "react-redux";
import { editExpenseAsync, removeExpenseAsync } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

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
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm expense={expense} onSubmit={onSubmit} />
        <button className="button button--secondary" onClick={onRemove}>
          Remove Expense
        </button>
      </div>
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
