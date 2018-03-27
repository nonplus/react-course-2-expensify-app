import {
  addExpense,
  editExpense,
  removeExpense,
  addExpenseAsync,
  setExpenses,
  setExpenseAsync,
  removeExpenseAsync,
  editExpenseAsync
} from "../expenses";
import * as _ from "lodash";
import expenses from "../../tests/fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(async () => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  await database.ref("expenses").set(expensesData);
});

describe("removeExpense", () => {
  it("should setup remove expense action object", () => {
    const action = removeExpense({ id: "123abc", foo: "bar" });
    expect(action).toEqual({
      type: "REMOVE_EXPENSE",
      id: "123abc"
    });
  });
});

describe("removeExpenseAsync", () => {
  it("should remove expense from database and store", async () => {
    const store = createMockStore({});
    const id = expenses[1].id;

    await store.dispatch(removeExpenseAsync({ id }));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "REMOVE_EXPENSE",
        id
      }
    ]);

    const snapshot = await database.ref(`expenses`).once("value");
    expect(snapshot.val()).toEqual({
      [expenses[0].id]: _.omit(expenses[0], "id"),
      [expenses[2].id]: _.omit(expenses[2], "id")
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

describe("editExpenseAsync", () => {
  it("should update expense in database and store", async () => {
    const store = createMockStore({});
    const updates = {
      description: "description",
      amount: 12345,
      note: "note",
      createdAt: 34567
    };
    const id = expenses[1].id;

    await store.dispatch(editExpenseAsync(id, updates));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "EDIT_EXPENSE",
        id,
        updates
      }
    ]);

    const snapshot = await database.ref(`expenses/${id}`).once("value");
    expect(snapshot.val()).toEqual(updates);
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
});

describe("addExpenseAsync", () => {
  describe("when values are provided", () => {
    it("should add expense to database and store", async () => {
      const store = createMockStore({});
      const expenseData = {
        description: "description",
        amount: 12345,
        note: "note",
        createdAt: 34567
      };

      await store.dispatch(addExpenseAsync(expenseData));
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

      await store.dispatch(addExpenseAsync({}));
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

describe("setExpenses", () => {
  describe("when values are provided", () => {
    it("should setup set expenses action object with provided values", () => {
      const action = setExpenses(expenses);
      expect(setExpenses(expenses)).toEqual({
        type: "SET_EXPENSES",
        expenses
      });
    });
  });
});

describe("setExpenseAsync", () => {
  it("should add expenses store", async () => {
    const store = createMockStore({});
    await store.dispatch(setExpenseAsync());
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "SET_EXPENSES",
        expenses
      }
    ]);
  });
});
