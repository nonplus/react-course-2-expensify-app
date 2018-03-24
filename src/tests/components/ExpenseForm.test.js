import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

describe("<ExpenseForm />", () => {
  describe("when no expense specified", () => {
    it("should render form with default data", () => {
      const wrapper = shallow(<ExpenseForm />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when expense specified", () => {
    it("should render form with expense data", () => {
      const expense = expenses[1];
      const wrapper = shallow(<ExpenseForm expense={expense} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("<form />", () => {
    describe("onSubmit", () => {
      describe("when description is empty", () => {
        it("should display error message", () => {
          const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
          wrapper.setState({ description: "" });
          expect(wrapper).toMatchSnapshot();
          wrapper.find("form").simulate("submit", { preventDefault() {} });
          expect(wrapper.state("error").length).toBeGreaterThan(0);
          expect(wrapper).toMatchSnapshot();
        });
      });
      describe("when amount is empty", () => {
        it("should display error message", () => {
          const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
          wrapper.setState({ amount: "" });
          expect(wrapper).toMatchSnapshot();
          wrapper.find("form").simulate("submit", { preventDefault() {} });
          expect(wrapper.state("error").length).toBeGreaterThan(0);
          expect(wrapper).toMatchSnapshot();
        });
      });
      describe("when all values valid", () => {
        it("should call onSubmit callback", () => {
          const onSubmit = jest.fn();
          const expense = expenses[1];
          const wrapper = shallow(
            <ExpenseForm expense={expense} onSubmit={onSubmit} />
          );
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
        const wrapper = shallow(<ExpenseForm />);
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
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find("textarea").simulate("change", {
          target: { value }
        });
        expect(wrapper.state("note")).toBe(value);
      });
    });
  });

  describe("<input/>[1]", () => {
    let wrapper, input;
    beforeEach(() => {
      wrapper = shallow(<ExpenseForm />);
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
          expect(wrapper.state("amount")).toBe("");
        });
      });
    });
  });

  describe("<SingleDatePicker />", () => {
    let wrapper = shallow(<ExpenseForm />);
    beforeEach(() => (wrapper = shallow(<ExpenseForm />)));
    describe("onDateChange", () => {
      it("should update state.createdAt", () => {
        const now = moment();
        wrapper.find("SingleDatePicker").prop("onDateChange")(now);
        expect(wrapper.state("createdAt")).toEqual(now);
      });
    });
    describe("onFocusChange", () => {
      it("should update state.calendarFocused", () => {
        const focused = true;
        wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
        expect(wrapper.state("calendarFocused")).toEqual(focused);
      });
    });
  });
});
