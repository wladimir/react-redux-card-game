import React from "react";
import { mount } from "enzyme";
import Player from "./Player";

describe("Player", () => {
  let props;
  let wrapper;
  const Player = () => {
    if (!mountedLockScreen) {
      mountedLockScreen = mount(<Player {...props} />);
    }
    return mountedLockScreen;
  };

  beforeEach(() => {
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined
    };
    mountedLockScreen = undefined;
  });

  it("always renders a div", () => {
    const divs = lockScreen().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
