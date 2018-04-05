import React from "react";
import { shallow } from "enzyme";
import expenses from "../../tests/fixtures/expenses";
import { AddExpensePage } from "../AddExpensePage";

describe("<AddExpensePage />", () => {
  let addExpenseAsync, history, wrapper;

  beforeEach(() => {
    addExpenseAsync = jest.fn();
    history = {
      push: jest.fn()
    };
    wrapper = shallow(
      <AddExpensePage addExpenseAsync={addExpenseAsync} history={history} />
    );
  });

  it("should render the page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("onSubmit", () => {
    let addExpenseAsyncPromise;
    beforeEach(() => {
      addExpenseAsyncPromise = Promise.resolve();
      addExpenseAsync.mockImplementation(() => addExpenseAsyncPromise);
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    });

    it("should call props.addExpenseAsync(expense)", () => {
      expect(addExpenseAsync).toHaveBeenLastCalledWith(expenses[1]);
    });
    it("should call history.push('/')", async () => {
      await addExpenseAsyncPromise;
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
