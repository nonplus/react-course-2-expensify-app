export const selectExpenses = (
  expenses,
  { text, sortBy, startDate, endDate }
) => {
  const startDateMatches = startDate
    ? expense => startDate.isSameOrBefore(expense.createdAt, "day")
    : () => true;
  const endDateMatches = endDate
    ? expense => endDate.isSameOrAfter(expense.createdAt, "day")
    : () => true;
  text = text.toLowerCase();
  const textMatches = !text
    ? () => true
    : expense => expense.description.toLowerCase().includes(text);

  const sortCompare =
    sortBy === "date"
      ? (a, b) => b.createdAt - a.createdAt
      : sortBy === "amount" ? (a, b) => b.amount - a.amount : () => 0;

  return expenses
    .filter(
      expense =>
        startDateMatches(expense) &&
        endDateMatches(expense) &&
        textMatches(expense)
    )
    .sort(sortCompare);
};
