import { StyleSheet } from "react-native";
import { color } from "../../constants";

const styles = StyleSheet.create({
  btn: {
    borderRadius: 25,
    marginBottom: 46,
    width: "100%"
  },
  btnText: {
    color: color.white
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40
  },
  brandInput: {
    backgroundColor: "transparent",
    marginBottom: 20
  },

  nameInput: {
    backgroundColor: "transparent",
    marginBottom: 60
  },

  logo: {
    alignSelf: "center",
    marginTop: 61,
    width: 500
  }
});

export default styles;
