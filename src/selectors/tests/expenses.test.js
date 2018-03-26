import { selectExpenses } from "../expenses";
import moment from "moment";
import expenses from "../../tests/fixtures/expenses";

describe("selectExpenses", () => {
  describe("when text is specified", () => {
    it("should filter by text value", () => {
      const filters = {
        text: "e",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
      };
      const result = selectExpenses(expenses, filters);
      expect(result).toEqual([expenses[2], expenses[1]]);
    });
  });

  describe("when startDate is specified", () => {
    it("should filter by startDate", () => {
      const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
      };
      const result = selectExpenses(expenses, filters);
      expect(result).toEqual([expenses[2], expenses[0]]);
    });
  });

  describe("when endDate is specified", () => {
    it("should filter by endDate", () => {
      const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(0)
      };
      const result = selectExpenses(expenses, filters);
      expect(result).toEqual([expenses[0], expenses[1]]);
    });
  });

  describe("when sortBy = 'date'", () => {
    it("should sort by createdAt, newest first", () => {
      const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
      };
      const result = selectExpenses(expenses, filters);
      expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
    });
  });

  describe("when sortBy = 'amount'", () => {
    it("should sort by amount, largest first", () => {
      const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
      };
      const result = selectExpenses(expenses, filters);
      expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
    });
  });
});
