import { shallow } from "enzyme";
import React from "react";
import { LoginPage } from "../LoginPage";

describe("<LoginPage />", () => {
  let wrapper, loginAsync;
  beforeEach(() => {
    loginAsync = jest.fn();
    wrapper = shallow(<LoginPage loginAsync={loginAsync} />);
  });

  it("should render page correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("<button />", () => {
    let button;
    beforeEach(() => (button = wrapper.find("button")));

    describe("onClick", () => {
      it("should call props.loginAsync", () => {
        button.simulate("click");
        expect(loginAsync).toHaveBeenCalled();
      });
    });
  });
});
