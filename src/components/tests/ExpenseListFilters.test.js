import React from "react";
import { shallow } from "enzyme";
import expenses from "../../tests/fixtures/expenses";
import { filters, altFilters } from "../../tests/fixtures/filters";
import moment from "moment";
import { ExpenseListFilters } from "../ExpenseListFilters";

describe("<ExpenseListFilters />", () => {
  let wrapper,
    setTextFilter,
    sortByAmount,
    sortByDate,
    setStartDate,
    setEndDate;

  beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  });

  it("should render the component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the component with altFilter correctly", () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
  });

  describe("input[text].onChange", () => {
    it("should call props.setTextFilter(text)", () => {
      const value = "FILTER VALUE";
      wrapper.find("input").simulate("change", {
        target: { value }
      });
      expect(setTextFilter).toHaveBeenCalledWith(value);
    });
  });

  describe("select", () => {
    let select;
    beforeEach(() => (select = wrapper.find("select")));

    describe("onChange 'date'", () => {
      it("should call props.sortByDate()", () => {
        const value = "date";
        select.simulate("change", {
          target: { value }
        });
        expect(sortByDate).toHaveBeenCalled();
      });
    });

    describe("onChange 'amount'", () => {
      it("should call props.sortByAmount()", () => {
        const value = "amount";
        select.simulate("change", {
          target: { value }
        });
        expect(sortByAmount).toHaveBeenCalled();
      });
    });
  }); // select

  describe("DateRangePicker", () => {
    let drp;

    beforeEach(() => (drp = wrapper.find("DateRangePicker")));

    describe("onDatesChange", () => {
      const startDate = moment().startOf("year");
      const endDate = moment().endOf("year");

      beforeEach(() => {
        drp.prop("onDatesChange")({ startDate, endDate });
      });

      it("should call props.setStartDate(startDate)", () => {
        expect(setStartDate).toHaveBeenCalledWith(startDate);
      });
      it("should call props.setEndDate(endDate)", () => {
        expect(setEndDate).toHaveBeenCalledWith(endDate);
      });
    });
    describe("onFocusChange", () => {
      it("should set state.calendarFocused", () => {
        ["startDate", "endDate", null].forEach(value => {
          drp.prop("onFocusChange")(value);
          expect(wrapper.state("calendarFocused")).toEqual(value);
        });
      });
    });
  }); // DateRangePicker
});
