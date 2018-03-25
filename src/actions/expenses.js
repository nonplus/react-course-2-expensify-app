import uuid from "uuid";
import database from "../firebase/firebase";

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
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

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
