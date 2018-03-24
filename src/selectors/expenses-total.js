import _ from "lodash";

export const selectExpensesTotal = expenses => _.sumBy(expenses, "amount");
