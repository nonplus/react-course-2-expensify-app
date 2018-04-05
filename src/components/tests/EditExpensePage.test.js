import React from "react";
import { shallow } from "enzyme";
import expenses from "../../tests/fixtures/expenses";
import { EditExpensePage } from "../EditExpensePage";

describe("<EditExpensePage />", () => {
  let editExpenseAsync, removeExpenseAsync, history, wrapper, expense;

  beforeEach(() => {
    expense = { ...expenses[1] };
    editExpenseAsync = jest.fn();
    removeExpenseAsync = jest.fn();
    history = {
      push: jest.fn()
    };
    wrapper = shallow(
      <EditExpensePage
        expense={expense}
        editExpenseAsync={editExpenseAsync}
        removeExpenseAsync={removeExpenseAsync}
        history={history}
      />
    );
  });

  it("should render the page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("ExpenseForm.onSubmit", () => {
    let editExpenseAsyncPromise;
    beforeEach(() => {
      editExpenseAsyncPromise = Promise.resolve(undefined);
      editExpenseAsync.mockReturnValue(editExpenseAsyncPromise);
    });
    it("should call props.editExpenseAsync(expense)", () => {
      const updates = { ...expense };
      delete updates.id;
      wrapper.find("ExpenseForm").prop("onSubmit")(updates);
      expect(editExpenseAsync).toHaveBeenLastCalledWith(expense.id, updates);
    });
    it("should call history.push('/')", async () => {
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
      await editExpenseAsyncPromise;
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });

  describe("button.onClick", () => {
    const removeExpenseAsyncPromise = Promise.resolve(undefined);
    beforeEach(() => {
      removeExpenseAsync.mockReturnValue(removeExpenseAsyncPromise);
    });
    it("should call props.removeExpense(expense)", () => {
      wrapper.find("button").prop("onClick")();
      expect(removeExpenseAsync).toHaveBeenLastCalledWith({ id: expense.id });
    });
    it("should call history.push('/')", async () => {
      wrapper.find("button").prop("onClick")();
      await removeExpenseAsyncPromise;
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
