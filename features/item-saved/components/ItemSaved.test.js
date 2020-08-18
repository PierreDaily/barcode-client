import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import { ItemSaved } from "./ItemSaved";

import renderer from "react-test-renderer";

let navigationMock;

jest.mock("../../../assets/img/green-check-circle.svg", () => ({
  __esModule: true,
  default: "CheckCircle"
}));

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  navigationMock = { navigate: jest.fn() };
});

test("renders correctly", () => {
  const tree = renderer.create(<ItemSaved />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("navigates to Home screen on 'No' button press", () => {
  const { getByTestId } = render(<ItemSaved navigation={navigationMock} />);

  const noButton = getByTestId("noBtn");

  fireEvent.press(noButton);
  expect(navigationMock.navigate).toHaveBeenCalledWith("Home");
});

test("navigates to Add-price screen on 'Yes' button press", () => {
  const { getByTestId } = render(<ItemSaved navigation={navigationMock} />);

  const yesButton = getByTestId("yesBtn");

  fireEvent.press(yesButton);
  expect(navigationMock.navigate).toHaveBeenCalledWith("Add-price");
});
