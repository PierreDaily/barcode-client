import React from "react";
import { Image, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";

const HomeScreen = () => (
  //   <View style={{ flex: 1 }}>

  <LinearGradient
    colors={["rgba(87,228,177,1)", "rgba(84,204,187,1)"]}
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%"
    }}
  >
    <Image
      style={{ width: 100, height: 100 }}
      source={require("../../../assets/img/magnifier-barcode.svg")}
    />
    <Text>Hello there</Text>
  </LinearGradient>
  //   </View>
);

HomeScreen.propTypes = {};

export { HomeScreen };
