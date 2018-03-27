import { shallow } from "enzyme";
import React from "react";
import { LoginPage } from "../LoginPage";

describe("<LoginPage />", () => {
  it("should render page correctly", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
