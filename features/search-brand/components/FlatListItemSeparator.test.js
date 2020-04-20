import React from "react";
import { FlatListItemSeparator } from "./FlatListItemSeparator";

import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<FlatListItemSeparator />).toJSON();
  expect(tree).toMatchSnapshot();
});
