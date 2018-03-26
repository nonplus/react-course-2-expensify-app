import moment from "moment";
import {
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
  setTextFilter
} from "../../actions/filters";

describe("setStartDate", () => {
  it("should generate set start date action object", () => {
    const startDate = moment();
    const action = setStartDate(startDate);
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { startDate }
    });
  });
});

describe("setEndDate", () => {
  it("should generate set end date action object", () => {
    const endDate = moment();
    const action = setEndDate(endDate);
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { endDate }
    });
  });
});

describe("sortByDate", () => {
  it("should generate action object for sort by date", () => {
    const action = sortByDate();
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { sortBy: "date" }
    });
  });
});

describe("sortByAmount", () => {
  it("should generate action object sort by amount", () => {
    const action = sortByAmount();
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { sortBy: "amount" }
    });
  });
});

describe("setTextFilter", () => {
  it("should generate set text filter object with specified value", () => {
    const action = setTextFilter("filter");
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { text: "filter" }
    });
  });

  it("should generate set text filter object with default value", () => {
    const action = setTextFilter();
    expect(action).toEqual({
      type: "CHANGE_FILTER",
      updates: { text: "" }
    });
  });
});
