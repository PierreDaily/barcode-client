import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import { FAB, Title } from "react-native-paper";
import Logo from "../../../assets/img/magnifier-barcode.svg";

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["rgba(87,228,177,1)", "rgba(84,204,187,1)"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <View style={{ display: "flex", alignItems: "center" }}>
        <Logo width="200" height="200" style={{ marginBottom: 10 }} />
        <Title
          style={{
            color: "#FFFFFF",
            fontFamily: "Montserrat-Medium",
            fontSize: 24,
            padding: "5%",
            textAlign: "center"
          }}
        >
          Compare groceries prices in Hong Kong
        </Title>
      </View>
      <View style={{ position: "absolute", bottom: 25, right: 25 }}>
        <FAB
          color="#FFFFFF"
          style={{
            bottom: 0,
            right: 0,
            position: "absolute"
          }}
          icon="barcode-scan"
          onPress={() => navigation.navigate("Barcode-scan")}
        />
      </View>
    </LinearGradient>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { HomeScreen };
