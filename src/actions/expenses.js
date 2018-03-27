import uuid from "uuid";
import database from "../firebase/firebase";
import _ from "lodash";

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const addExpenseAsync = (expenseData = {}) => {
  return async dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    const ref = await database.ref("expenses").push(expense);
    await dispatch(addExpense({ id: ref.key, ...expense }));
  };
};

export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const setExpenseAsync = () => {
  return async dispatch => {
    const snapshot = await database.ref("expenses").once("value");
    const expenses = _.map(snapshot.val(), (value, id) => ({ id, ...value }));
    dispatch(setExpenses(expenses));
  };
};

export const editExpense = (id, updates) => {
  const { description, note, amount, createdAt } = updates;
  return {
    type: "EDIT_EXPENSE",
    id,
    updates: {
      description,
      note,
      amount,
      createdAt
    }
  };
};

export const editExpenseAsync = (id, updates) => {
  const { description, note, amount, createdAt } = updates;
  return async dispatch => {
    await database
      .ref(`expenses/${id}`)
      .set({ description, note, amount, createdAt });
    dispatch(editExpense(id, updates));
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const removeExpenseAsync = ({ id } = {}) => {
  return async dispatch => {
    await database.ref(`expenses/${id}`).remove();
    dispatch(removeExpense({ id }));
  };
};
