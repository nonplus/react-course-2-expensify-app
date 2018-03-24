import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

describe("removeExpense", () => {
  it("should setup remove expense action object", () => {
    const action = removeExpense({ id: "123abc", foo: "bar" });
    expect(action).toEqual({
      type: "REMOVE_EXPENSE",
      id: "123abc"
    });
  });
});

describe("editExpense", () => {
  it("should setup edit expense action object", () => {
    const action = editExpense("123abc", {
      invalid: "property",
      note: "note"
    });
    expect(action).toEqual({
      type: "EDIT_EXPENSE",
      id: "123abc",
      updates: {
        note: "note"
      }
    });
  });
});

describe("addExpense", () => {
  describe("when values are provided", () => {
    it("should setup add expense action object with provided values", () => {
      const expenseData = {
        foo: "bar",
        note: "note",
        description: "description",
        amount: 123,
        createdAt: 456
      };
      const action = addExpense(expenseData);
      expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          note: "note",
          description: "description",
          amount: 123,
          createdAt: 456,
          id: expect.any(String)
        }
      });
    });
  });

  describe("when values are undefined", () => {
    it("should setup add expense action object with default values", () => {
      const expenseData = {};
      const action = addExpense(expenseData);
      expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          description: "",
          note: "",
          amount: 0,
          createdAt: 0,
          id: expect.any(String)
        }
      });
    });
  });
});
