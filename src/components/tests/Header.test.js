import { shallow } from "enzyme";
import React from "react";
import { Header } from "../Header";

describe("<Header />", () => {
  let wrapper, logoutAsync;
  beforeEach(() => {
    logoutAsync = jest.fn();
    wrapper = shallow(<Header logoutAsync={logoutAsync} />);
  });

  it("should render Header correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("<button/>", () => {
    let button;
    beforeEach(() => (button = wrapper.find("button")));

    describe("onClick", () => {
      it("should call logoutAsync", () => {
        button.simulate("click");
        expect(logoutAsync).toHaveBeenCalled();
      });
    });
  });
});
