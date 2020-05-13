import React from "react";
import {
  act,
  cleanup,
  render,
  fireEvent,
  flushMicrotasksQueue
} from "react-native-testing-library";
import { ItemDetails } from "./ItemDetails";
import renderer from "react-test-renderer";

jest.mock("../../../assets/img/green-barcode.svg", () => ({
  __esModule: true,
  default: "Logo"
}));

let minProps;

beforeEach(() => {
  minProps = {
    navigation: { navigate: jest.fn() },
    route: { params: { barcode: "123456789", type: "EAN" } }
  };
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test("renders correctly", async () => {
  const tree = renderer.create(<ItemDetails {...minProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("should submit the form with the correct informations", async () => {
  const itemName = "random item";
  const props = {
    ...minProps,
    route: {
      params: { ...minProps.route.params, brandName: "Brand Name", brandId: 4 }
    }
  };
  const { getByTestId } = render(<ItemDetails {...props} />);

  const {
    route: {
      params: { barcode, brandId, type }
    }
  } = props;
  const nextScreen = "Item-photo";

  expect(getByTestId("form")).toBeTruthy();

  fireEvent.changeText(getByTestId("textInput"), itemName);
  await act(async () => fireEvent(getByTestId("submit"), "onPress"));

  expect(props.navigation.navigate).toHaveBeenCalledWith(nextScreen, {
    barcode,
    brand: brandId,
    name: itemName,
    type
  });
});

test("shouldn't submit the form because informations are missing", async () => {
  const itemName = "random item";
  const { getByTestId } = render(<ItemDetails {...minProps} />);

  expect(getByTestId("form")).toBeTruthy();

  fireEvent.changeText(getByTestId("textInput"), itemName);
  await act(async () => fireEvent(getByTestId("submit"), "onPress"));
  await act(async () => flushMicrotasksQueue());

  expect(minProps.navigation.navigate).not.toHaveBeenCalledWith();
});

test("should navigate to 'Search' screen", async () => {
  const expectedRoute = "Search";
  const expectedValue = { barcode: "123456789", type: "EAN" };

  const { getByTestId } = render(<ItemDetails {...minProps} />);

  await act(async () => fireEvent(getByTestId("search"), "onFocus"));

  expect(minProps.navigation.navigate).toHaveBeenCalledWith(
    expectedRoute,
    expectedValue
  );
});
