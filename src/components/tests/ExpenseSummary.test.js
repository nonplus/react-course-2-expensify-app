import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../ExpenseSummary";

describe("<ExpenseSummary />", () => {
  it("should render summary for 0 expenses", () => {
    const wrapper = shallow(
      <ExpenseSummary expenseCount={0} expensesTotal={0} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should render summary for 1 expense", () => {
    const wrapper = shallow(
      <ExpenseSummary expenseCount={1} expensesTotal={123.45} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should render summary for 2 expenses", () => {
    const wrapper = shallow(
      <ExpenseSummary expenseCount={2} expensesTotal={123.45} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should render summary for thousands of expenses", () => {
    const wrapper = shallow(
      <ExpenseSummary expenseCount={12345} expensesTotal={123456789} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
