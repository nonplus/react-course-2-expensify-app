import { shallow } from "enzyme";
import React from "react";
import { LoadingPage } from "../LoadingPage";

describe("LoadingPage", () => {
  it("should render page correctly", () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
