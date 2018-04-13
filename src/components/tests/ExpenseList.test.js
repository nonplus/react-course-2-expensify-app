import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../ExpenseList";
import expenses from "../../tests/fixtures/expenses";

describe("<ExpenseList />", () => {
  it("should remder list with expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should show default message with empty expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
