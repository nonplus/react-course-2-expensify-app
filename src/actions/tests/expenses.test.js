import * as _ from "lodash";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expenses from "../../tests/fixtures/expenses";
import {
  addExpense,
  addExpenseAsync,
  editExpense,
  editExpenseAsync,
  removeExpense,
  removeExpenseAsync,
  setExpenseAsync,
  setExpenses
} from "../expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

describe("expenses", () => {
  describe("actions", () => {
    describe("addExpense", () => {
      describe("when values are provided", () => {
        it("should setup add expense action object with provided values", () => {
          const expense = expenses[1];
          const action = addExpense(expense);
          expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense
          });
        });
      }); // when values are provided
    }); // addExpense

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
    }); // editExpense

    describe("removeExpense", () => {
      it("should setup remove expense action object", () => {
        const action = removeExpense({ id: "123abc", foo: "bar" });
        expect(action).toEqual({
          type: "REMOVE_EXPENSE",
          id: "123abc"
        });
      });
    }); // removeExpense

    describe("setExpenses", () => {
      describe("when values are provided", () => {
        it("should setup set expenses action object with provided values", () => {
          const action = setExpenses(expenses);
          expect(action).toEqual({
            type: "SET_EXPENSES",
            expenses
          });
        });
      }); // when values are provided
    }); // setExpenses
  }); // actions

  describe("async actions", () => {
    const uid = "uid";
    let store;
    beforeEach(async () => {
      store = createMockStore({
        auth: { uid }
      });

      const expensesData = {};
      expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
      });
      await database.ref(`users/${uid}/expenses`).set(expensesData);
    });

    describe("addExpenseAsync", () => {
      describe("when values are provided", () => {
        it("should add expense to database and store", async () => {
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
          const snapshot = await database
            .ref(`users/${uid}/expenses/${id}`)
            .once("value");

          expect(snapshot.val()).toEqual(expenseData);
        });
      }); // when values are provided

      describe("when values are missing", () => {
        it("should add default expense to database and store", async () => {
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
          const snapshot = await database
            .ref(`users/${uid}/expenses/${id}`)
            .once("value");

          expect(snapshot.val()).toEqual(expenseDefaults);
        });
      }); // when values are missing
    }); // addExpenseAsync

    describe("editExpenseAsync", () => {
      it("should update expense in database and store", async () => {
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

        const snapshot = await database
          .ref(`users/${uid}/expenses/${id}`)
          .once("value");
        expect(snapshot.val()).toEqual(updates);
      });
    }); // editExpenseAsync

    describe("removeExpenseAsync", () => {
      it("should remove expense from database and store", async () => {
        const id = expenses[1].id;

        await store.dispatch(removeExpenseAsync({ id }));

        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "REMOVE_EXPENSE",
            id
          }
        ]);

        const snapshot = await database
          .ref(`users/${uid}/expenses`)
          .once("value");
        expect(snapshot.val()).toEqual({
          [expenses[0].id]: _.omit(expenses[0], "id"),
          [expenses[2].id]: _.omit(expenses[2], "id")
        });
      });
    }); // removeExpenseAsync

    describe("setExpenseAsync", () => {
      it("should add expenses store", async () => {
        await store.dispatch(setExpenseAsync());
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "SET_EXPENSES",
            expenses
          }
        ]);
      });
    }); // setExpenseAsync
  }); // async actions
});
