import filtersReducer, { filtersReducerDefaultState } from "../filters";
import moment from "moment";

describe("filtersReducer", () => {
  describe("@@INIT", () => {
    it("should setup default filter values", () => {
      const state = filtersReducer(undefined, { type: "@@INIT" });
      expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
      });
    });
  });

  describe("CHANGE_FILTER", () => {
    it("should update filter values", () => {
      const updates = {
        text: "text",
        sortBy: "amount",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
      };

      const state = filtersReducer(
        { ...filtersReducerDefaultState },
        {
          type: "CHANGE_FILTER",
          updates
        }
      );
      expect(state).toEqual(updates);
    });
  });
});
