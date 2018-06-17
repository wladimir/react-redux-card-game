import React from "react";
import { StartScreen } from "../StartScreen";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";

describe("StartScreen", () => {
  it("should contain title and 3 buttons", () => {
    const component = renderer.create(
      <MemoryRouter>
        <StartScreen startGame={() => {}} />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
