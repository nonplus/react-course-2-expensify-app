import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import moment from "moment";
import { AddExpensePage } from "../../components/AddExpensePage";

describe("<AddExpensePage />", () => {
  let startAddExpense, history, wrapper;

  beforeEach(() => {
    startAddExpense = jest.fn();
    history = {
      push: jest.fn()
    };
    wrapper = shallow(
      <AddExpensePage startAddExpense={startAddExpense} history={history} />
    );
  });

  it("should render the page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("onSubmit", () => {
    let startAddExpensePromise;
    beforeEach(() => {
      startAddExpensePromise = Promise.resolve();
      startAddExpense.mockImplementation(() => startAddExpensePromise);
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    });

    it("should call props.startAddExpense(expense)", () => {
      expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
    });
    it("should call history.push('/')", async () => {
      await startAddExpensePromise;
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
