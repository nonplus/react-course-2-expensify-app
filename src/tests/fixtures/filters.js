import moment from "moment";

export const filters = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

export const altFilters = {
  text: "TEXT",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
};
