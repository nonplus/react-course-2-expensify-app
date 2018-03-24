import { shallow } from "enzyme";
import React from "react";
import NotFoundPage from "../../components/NotFoundPage";

describe("NotFoundPage", () => {
  it("should render page correctly", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
