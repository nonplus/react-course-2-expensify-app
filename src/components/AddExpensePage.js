import React from "react";
import { connect } from "react-redux";
import { addExpenseAsync } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export class AddExpensePage extends React.Component {
  onSubmit = async expense => {
    await this.props.addExpenseAsync(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = dispatch => ({
  addExpenseAsync: expense => dispatch(addExpenseAsync(expense))
});

export default connect(undefined, mapPropsToDispatch)(AddExpensePage);
