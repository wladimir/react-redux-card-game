import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WinScreen from "../WinScreen";

configure({ adapter: new Adapter() });

describe("WinScreen", () => {
  let wrapper;

  const props = {
    gameWinners: { names: ["John", "Jane"], score: 100 },
    onClick: jest.fn()
  };

  it("should render correctly", () => {
    wrapper = shallow(<WinScreen {...props} />);

    expect(wrapper.children().length).toEqual(2);
  });

  it("should render correct info about winners", () => {
    wrapper = shallow(<WinScreen {...props} />);
    expect(wrapper.childAt(0).text()).toBe(
      "Winners are John, Jane with score: 100"
    );
  });

  it("should call ", () => {
    wrapper = shallow(<WinScreen {...props} />);
    const button = wrapper
      .find("div")
      .find("Link")
      .find("Button");

    button.simulate("click");

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
