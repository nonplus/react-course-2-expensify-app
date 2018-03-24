export const setTextFilter = (text = "") => ({
  type: "CHANGE_FILTER",
  updates: { text }
});

export const sortByDate = () => ({
  type: "CHANGE_FILTER",
  updates: { sortBy: "date" }
});

export const sortByAmount = () => ({
  type: "CHANGE_FILTER",
  updates: { sortBy: "amount" }
});

export const setStartDate = startDate => ({
  type: "CHANGE_FILTER",
  updates: { startDate }
});

export const setEndDate = endDate => ({
  type: "CHANGE_FILTER",
  updates: { endDate }
});
