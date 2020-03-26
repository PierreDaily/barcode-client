import React from "react";
import {
  act,
  cleanup,
  render,
  fireEvent,
  waitForElement,
  flushMicrotasksQueue
} from "react-native-testing-library";
import ItemDetails from "./ItemDetails";
import api from "../api/api";
jest.mock("../api/api");
import renderer from "react-test-renderer";

const props = {
  navigation: { navigate: jest.fn() },
  route: { params: { barcode: "123456789" } }
};

const spy = jest.spyOn(api, "get").mockImplementation(() =>
  Promise.resolve({
    data: [
      {
        id: 1,
        name: "nestle"
      },
      {
        id: 2,
        name: "coca cola"
      }
    ]
  })
);

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test("renders correctly", async () => {
  const tree = renderer.create(<ItemDetails {...props} />).toJSON();
  await act(async () => flushMicrotasksQueue());
  expect(tree).toMatchSnapshot();
  expect(spy).toHaveBeenCalledTimes(1);
});

test("renders the form after fetching brand list", async () => {
  const { getByTestId, getAllByTestId } = render(<ItemDetails {...props} />);

  expect(getAllByTestId("loading")).toHaveLength(1);
  await (async () => waitForElement(() => getByTestId("form")));
  expect(getByTestId("form")).toBeTruthy();
  expect(spy).toHaveBeenCalledWith("/brand");
  expect(spy).toHaveBeenCalledTimes(1);
});

test("Submit the form", async () => {
  const { getByTestId, getAllByTestId } = render(<ItemDetails {...props} />);

  const {
    route: {
      params: { barcode }
    }
  } = props;
  const brand = 2;
  const name = "Random item";
  const nextScreen = "Item-photo";

  expect(getAllByTestId("loading")).toHaveLength(1);
  await (async () => waitForElement(() => getByTestId("form")));
  expect(getByTestId("form")).toBeTruthy();
  expect(spy).toHaveBeenCalledWith("/brand");
  expect(spy).toHaveBeenCalledTimes(1);

  await act(async () =>
    fireEvent(getByTestId("picker"), "onValueChange", brand)
  );

  fireEvent.changeText(getByTestId("textInput"), name);
  await act(async () => fireEvent(getByTestId("submit"), "onPress"));
  await act(async () => flushMicrotasksQueue());

  expect(props.navigation.navigate).toHaveBeenCalledWith(nextScreen, {
    barcode,
    brand,
    name
  });
});
