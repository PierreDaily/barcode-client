import React from "react";
import { Button } from "./Button";

import renderer from "react-test-renderer";

const minProps = {
  onPress: jest.fn(),
  children: "Click Me"
};

test("renders correctly", () => {
  const tree = renderer.create(<Button {...minProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
