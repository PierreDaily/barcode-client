import { StyleSheet } from "react-native";
import { color, font } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    justifyContent: "center"
  },
  content: {
    height: "55%"
  },
  fab: { bottom: 0, right: 0, position: "absolute" },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    resizeMode: "contain",
    height: 205,
    width: 205
  },
  text: {
    color: color.primary,
    fontFamily: font.primary,
    fontSize: 20,
    marginTop: "20%",
    textAlign: "center"
  }
});

export default styles;
