import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpenseAsync } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = async expense => {
    await this.props.addExpenseAsync(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapPropsToDispatch = dispatch => ({
  addExpenseAsync: expense => dispatch(addExpenseAsync(expense))
});

export default connect(undefined, mapPropsToDispatch)(AddExpensePage);
