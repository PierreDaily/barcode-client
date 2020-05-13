import React from "react";
import { ButtonPrimary } from "./ButtonPrimary";

import renderer from "react-test-renderer";

const minProps = {
  onPress: jest.fn(),
  children: "Click Me"
};

test("renders correctly", () => {
  const tree = renderer.create(<ButtonPrimary {...minProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
