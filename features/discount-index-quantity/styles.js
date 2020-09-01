import { StyleSheet } from "react-native";
import { color, font } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40
  },
  btn: {
    marginBottom: 46
  },
  text: {
    color: color.primary,
    fontFamily: font.primary,
    fontSize: 18,
    textAlign: "center"
  },
  priceInput: {
    backgroundColor: "transparent"
  }
});

export default styles;
