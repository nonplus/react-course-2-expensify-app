import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import moment from "moment";
import { AddExpensePage } from "../../components/AddExpensePage";

describe("<AddExpensePage />", () => {
  let addExpense, history, wrapper;

  beforeEach(() => {
    addExpense = jest.fn();
    history = {
      push: jest.fn()
    };
    wrapper = shallow(
      <AddExpensePage addExpense={addExpense} history={history} />
    );
  });

  it("should render the page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("onSubmit", () => {
    it("should call props.addExpense(expense)", () => {
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
      expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
    });
    it("should call history.push('/')", () => {
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
