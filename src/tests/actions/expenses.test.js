import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

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
      const expense = expenses[1];
      const action = addExpense(expense);
      expect(addExpense(expense)).toEqual({
        type: "ADD_EXPENSE",
        expense
      });
    });
  });

  // describe("when values are undefined", () => {
  //   it("should setup add expense action object with default values", () => {
  //     const expenseData = {};
  //     const action = addExpense(expenseData);
  //     expect(action).toEqual({
  //       type: "ADD_EXPENSE",
  //       expense: {
  //         description: "",
  //         note: "",
  //         amount: 0,
  //         createdAt: 0,
  //         id: expect.any(String)
  //       }
  //     });
  //   });
  // });
});

describe("startAddExpense", () => {
  describe("when values are provided", () => {
    it("should add expense to database and store", async () => {
      const store = createMockStore({});
      const expenseData = {
        description: "description",
        amount: 12345,
        note: "note",
        createdAt: 34567
      };

      await store.dispatch(startAddExpense(expenseData));
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: "ADD_EXPENSE",
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        }
      ]);

      const id = actions[0].expense.id;
      const snapshot = await database.ref(`expenses/${id}`).once("value");

      expect(snapshot.val()).toEqual(expenseData);
    });
  });

  describe("when values are missing", () => {
    it("should add default expense to database and store", async () => {
      const store = createMockStore({});
      const expenseDefaults = {
        description: "",
        amount: 0,
        note: "",
        createdAt: 0
      };

      await store.dispatch(startAddExpense({}));
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: "ADD_EXPENSE",
          expense: {
            id: expect.any(String),
            ...expenseDefaults
          }
        }
      ]);

      const id = actions[0].expense.id;
      const snapshot = await database.ref(`expenses/${id}`).once("value");

      expect(snapshot.val()).toEqual(expenseDefaults);
    });
  });
});
