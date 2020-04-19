import React from "react";
import SearchList from "./SearchList";

import {
  act,
  cleanup,
  render,
  fireEvent,
  waitForElement,
  flushMicrotasksQueue
} from "react-native-testing-library";
import renderer from "react-test-renderer";
import api from "../api";
jest.mock("./api");

let minProps;
const spy = jest.spyOn(api, "searchBrand").mockImplementation(() =>
  Promise.resolve([
    {
      id: 1,
      name: "nestle"
    },
    {
      id: 2,
      name: "coca cola"
    }
  ])
);

const spyPost = jest.spyOn(api, "postBrand").mockImplementation(() =>
  Promise.resolve({
    id: 3,
    name: "new brand"
  })
);

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
  const tree = renderer.create(<SearchList {...minProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("query the API when typing in the search bar", async () => {
  const query = "coca";
  const { getByTestId } = render(<SearchList {...minProps} />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toBeTruthy();
  fireEvent(searchBar, "onChangeText", query);
  await act(async () => flushMicrotasksQueue());
  expect(spy).toHaveBeenCalledWith(query);
});

test("navigate to Item-details screen with correct props on click", async () => {
  const query = "zerty";
  const expectedRoute = "Item-details";
  const expectedValues = {
    barcode: "123456789",
    brandId: 1,
    brandName: "nestle",
    type: "EAN"
  };
  const { getByTestId, getByText } = render(<SearchList {...minProps} />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toBeTruthy();
  fireEvent(searchBar, "onChangeText", query);
  expect(spy).toHaveBeenCalledWith(query);

  await act(async () => waitForElement(() => getByText("nestle")));
  expect(getByText("nestle")).toBeTruthy();

  fireEvent.press(getByText("nestle"));

  expect(minProps.navigation.navigate).toHaveBeenCalledWith(
    expectedRoute,
    expectedValues
  );
});

test("display ADD brand option when typing any brand name", async () => {
  const query = "abcd";
  const { getByTestId } = render(<SearchList {...minProps} />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toBeTruthy();
  fireEvent(searchBar, "onChangeText", query);
  expect(spy).toHaveBeenCalledWith(query);
  const newBrand = getByTestId("new-brand");
  await act(async () => waitForElement(() => newBrand));
  expect(newBrand).toBeTruthy();
});

test("navigate to Item-details with the right paramater if click on new brand", async () => {
  const expectedRoute = "Item-details";
  const expectedValues = {
    barcode: "123456789",
    brandId: 3,
    brandName: "new brand",
    type: "EAN"
  };
  const query = "abcd";

  const { getByTestId } = render(<SearchList {...minProps} />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toBeTruthy();
  fireEvent(searchBar, "onChangeText", query);
  const newBrand = getByTestId("new-brand");
  await act(async () => waitForElement(() => newBrand));
  fireEvent.press(newBrand);
  await act(async () => flushMicrotasksQueue());
  expect(spyPost).toHaveBeenCalled();
  expect(minProps.navigation.navigate).toHaveBeenCalledWith(
    expectedRoute,
    expectedValues
  );
});
