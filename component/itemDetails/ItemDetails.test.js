import React from "react";
import {
  act,
  render,
  fireEvent,
  waitForElement,
  flushMicrotasksQueue
} from "react-native-testing-library";
import ItemDetails from "./ItemDetails";
import api from "../api/api";
jest.mock("../api/api");
import renderer from "react-test-renderer";

let props;

beforeEach(() => {
  props = {
    navigation: { navigate: jest.fn() },
    route: { params: { barcode: "123456789" } }
  };
});

test("renders correctly", () => {
  const tree = renderer.create(<ItemDetails {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("useEffect API call works", async () => {
  api.get.mockResolvedValue({
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
  });
  const { getByTestId, getAllByTestId } = render(<ItemDetails {...props} />);

  expect(getAllByTestId("loading")).toHaveLength(1);
  await act(async () => flushMicrotasksQueue());
  expect(getByTestId("form")).toBeTruthy();
  expect(api.get).toHaveBeenCalledWith("/brand");
});
