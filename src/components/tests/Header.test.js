import { shallow } from "enzyme";
import React from "react";
import Header from "../Header";

describe("Header", () => {
  it("should render Header correctly", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
