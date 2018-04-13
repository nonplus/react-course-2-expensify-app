import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../ExpenseForm";
import expenses from "../../tests/fixtures/expenses";

describe("<ExpenseForm />", () => {
  const expense = expenses[1];
  let wrapper;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmit} />);
  });

  describe("when no expense specified", () => {
    it("should render form with default data", () => {
      expect(shallow(<ExpenseForm />)).toMatchSnapshot();
    });
  });

  describe("when expense specified", () => {
    it("should render form with expense data", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("<form />", () => {
    describe("onSubmit", () => {
      describe("when description is empty", () => {
        it("should display error message", () => {
          wrapper.setState({ description: "" });
          expect(wrapper).toMatchSnapshot();
          wrapper.find("form").simulate("submit", { preventDefault() {} });
          expect(wrapper.state("error").length).toBeGreaterThan(0);
          expect(wrapper).toMatchSnapshot();
        });
      });
      describe("when amount is empty", () => {
        it("should display error message", () => {
          wrapper.setState({ amount: "" });
          expect(wrapper).toMatchSnapshot();
          wrapper.find("form").simulate("submit", { preventDefault() {} });
          expect(wrapper.state("error").length).toBeGreaterThan(0);
          expect(wrapper).toMatchSnapshot();
        });
      });
      describe("when all values valid", () => {
        it("should call onSubmit callback", () => {
          expect(wrapper).toMatchSnapshot();
          wrapper.find("form").simulate("submit", { preventDefault() {} });
          expect(wrapper.state("error")).toBe("");
          expect(onSubmit).toHaveBeenCalledWith({
            description: expense.description,
            amount: expense.amount,
            createdAt: expense.createdAt,
            note: expense.note
          });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("<input/>[0]", () => {
    describe("onChange", () => {
      it("should update state.description", () => {
        const value = "New Description";
        wrapper
          .find("input")
          .at(0)
          .simulate("change", {
            target: { value }
          });
        expect(wrapper.state("description")).toBe(value);
      });
    });
  });

  describe("<textarea/>[0]", () => {
    describe("onChange", () => {
      it("should update state.note", () => {
        const value = "New Note";
        wrapper.find("textarea").simulate("change", {
          target: { value }
        });
        expect(wrapper.state("note")).toBe(value);
      });
    });
  });

  describe("<input/>[1]", () => {
    let input;
    beforeEach(() => {
      input = wrapper.find("input").at(1);
    });
    describe("onChange", () => {
      describe("with valid input", () => {
        it("should update state.amount", () => {
          const value = "123.45";
          input.simulate("change", {
            target: { value }
          });
          expect(wrapper.state("amount")).toBe(value);
        });
      });
      describe("with invalid input", () => {
        it("should NOT update state.amount", () => {
          const value = "123.456";
          input.simulate("change", {
            target: { value }
          });
          expect(wrapper.state("amount")).toBe(String(expense.amount / 100));
        });
      });
    });
  });

  describe("<SingleDatePicker />", () => {
    let datePicker;
    beforeEach(() => (datePicker = wrapper.find("SingleDatePicker")));
    describe("onDateChange", () => {
      it("should update state.createdAt", () => {
        const now = moment();
        datePicker.prop("onDateChange")(now);
        expect(wrapper.state("createdAt")).toEqual(now);
      });
    });
    describe("onFocusChange", () => {
      it("should update state.calendarFocused", () => {
        const focused = true;
        datePicker.prop("onFocusChange")({ focused });
        expect(wrapper.state("calendarFocused")).toEqual(focused);
      });
    });
  });
});
