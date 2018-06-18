import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Player from "../Player";

configure({ adapter: new Adapter() });

describe("Player", () => {
  let wrapper;

  const props = {
    id: 123,
    name: "John",
    score: 0,
    cards: [],
    activePlayer: 0
  };

  it("renders player stats", () => {
    wrapper = shallow(<Player {...props} />);
    expect(wrapper.find("PlayerStats").length).toEqual(1);
  });

  it("renders cards", () => {
    wrapper = shallow(<Player {...props} />);
    expect(wrapper.find("PlayerHand").length).toEqual(1);
  });
});
