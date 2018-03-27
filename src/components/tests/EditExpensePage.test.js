import React from "react";
import { shallow } from "enzyme";
import expenses from "../../tests/fixtures/expenses";
import moment from "moment";
import { EditExpensePage } from "../EditExpensePage";

describe("<EditExpensePage />", () => {
  let editExpense, startRemoveExpense, history, wrapper, expense;

  beforeEach(() => {
    expense = { ...expenses[1] };
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {
      push: jest.fn()
    };
    wrapper = shallow(
      <EditExpensePage
        expense={expense}
        editExpense={editExpense}
        startRemoveExpense={startRemoveExpense}
        history={history}
      />
    );
  });

  it("should render the page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("ExpenseForm.onSubmit", () => {
    it("should call props.editExpense(expense)", () => {
      const updates = { ...expense };
      delete updates.id;
      wrapper.find("ExpenseForm").prop("onSubmit")(updates);
      expect(editExpense).toHaveBeenLastCalledWith(expense.id, updates);
    });
    it("should call history.push('/')", () => {
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });

  describe("button.onClick", () => {
    const startRemoveExpensePromise = Promise.resolve(undefined);
    beforeEach(() => {
      startRemoveExpense.mockReturnValue(startRemoveExpensePromise);
    });
    it("should call props.removeExpense(expense)", () => {
      wrapper.find("button").prop("onClick")();
      expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
    });
    it("should call history.push('/')", async () => {
      wrapper.find("button").prop("onClick")();
      await startRemoveExpensePromise;
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
