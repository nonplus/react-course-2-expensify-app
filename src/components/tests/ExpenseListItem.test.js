import React from "react";
import { shallow } from "enzyme";
import expenses from "../../tests/fixtures/expenses";
import ExpenseListItem from "../ExpenseListItem";

describe("ExpenseListItem", () => {
  it("should remder list it with expense", () => {
    const expense = expenses[0];
    const wrapper = shallow(<ExpenseListItem {...expense} />);
    expect(wrapper).toMatchSnapshot();
  });
});
