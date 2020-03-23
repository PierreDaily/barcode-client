import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import ItemSaved from "./ItemSaved";

import renderer from "react-test-renderer";

let navigationMock;

beforeEach(() => {
  navigationMock = { navigate: jest.fn() };
});

test("renders correctly", () => {
  const tree = renderer.create(<ItemSaved />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("navigates to Home screen on button press", () => {
  const { queryAllByA11yRole } = render(
    <ItemSaved navigation={navigationMock} />
  );

  const homeButton = queryAllByA11yRole("button");
  expect(homeButton).toHaveLength(1);

  fireEvent.press(homeButton[0]);
  expect(navigationMock.navigate).toHaveBeenCalledWith("Home");
});
