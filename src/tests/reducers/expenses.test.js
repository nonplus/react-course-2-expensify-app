import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

describe("expensesReducer", () => {
  describe("@@INIT", () => {
    it("should set default state", () => {
      expect(expensesReducer(undefined, { type: "@@INIT" })).toEqual([]);
    });
  });

  describe("SET_EXPENSES", () => {
    it("should replace expenses", () => {
      const action = { type: "SET_EXPENSES", expenses };
      expect(expensesReducer([expenses[1]], action)).toEqual(expenses);
    });
  });

  describe("REMOVE_EXPENSE", () => {
    describe("when existing id specified", () => {
      it("should remove matching expense", () => {
        const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
        expect(expensesReducer(expenses, action)).toEqual([
          expenses[0],
          expenses[2]
        ]);
      });
    });

    describe("when non-existing id specified", () => {
      it("should remove expenses", () => {
        const action = { type: "REMOVE_EXPENSE", id: "bogus" };
        expect(expensesReducer(expenses, action)).toEqual(expenses);
      });
    });
  });

  describe("ADD_EXPENSE", () => {
    it("should add expense", () => {
      const expense = {
        description: "description",
        amount: 12345,
        note: "note",
        createdAt: 123,
        id: "id"
      };
      const action = { type: "ADD_EXPENSE", expense };
      expect(expensesReducer(expenses, action)).toEqual([...expenses, expense]);
    });
  });

  describe("EDIT_EXPENSE", () => {
    const updates = {
      description: "description",
      amount: 12345,
      note: "note",
      createdAt: 123
    };

    describe("with existing id", () => {
      it("should update the expense", () => {
        const action = { type: "EDIT_EXPENSE", id: expenses[1].id, updates };
        expect(expensesReducer(expenses, action)).toEqual([
          expenses[0],
          { ...expenses[1], ...updates },
          expenses[2]
        ]);
      });
    });

    describe("with non-existing id", () => {
      const action = { type: "EDIT_EXPENSE", id: "missing", updates };
      expect(expensesReducer(expenses, action)).toEqual(expenses);
    });
  });
});
