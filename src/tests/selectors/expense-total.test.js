import { selectExpensesTotal } from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

describe("selectExpensesTotal", () => {
  it("should return 0 for no expenses", () => {
    expect(selectExpensesTotal([])).toBe(0);
  });
  it("should correctly add a single expense", () => {
    const expense = expenses[1];
    expect(selectExpensesTotal([expense])).toBe(expense.amount);
  });
  it("should correctly add up multiple expenses", () => {
    expect(selectExpensesTotal([expenses[0], expenses[1]])).toBe(
      expenses[0].amount + expenses[1].amount
    );
  });
});
