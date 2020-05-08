import { DefaultTheme } from "react-native-paper";
import { color } from "../constants/color";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: color.primary
  }
};

export { theme };
