import { shallow } from "enzyme";
import React from "react";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

describe("ExpenseDashboardPage", () => {
  it("should render page correctly", () => {
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
