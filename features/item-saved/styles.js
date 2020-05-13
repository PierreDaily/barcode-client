import { StyleSheet } from "react-native";
import { color } from "../../constants";

const styles = StyleSheet.create({
  btn: {
    bottom: 46,
    position: "absolute",
    marginLeft: 40
  },

  checkCircle: {
    marginBottom: 60
  },
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40
  },
  content: {
    alignItems: "center",
    display: "flex",

    height: 260,
    top: 133
  },
  text: {
    color: color.primary,
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    textAlign: "center"
  }
});

export default styles;
