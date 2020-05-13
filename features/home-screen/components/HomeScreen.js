import React from "react";
import { Image, View, Text } from "react-native";
import PropTypes from "prop-types";
import { FAB } from "react-native-paper";
import styles from "../styles";
import { color } from "../../../constants";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../../../assets/img/green-cart.png")}
        />
        <Text style={styles.text}>
          Scan and compare retail prices in Hong Kong
        </Text>
      </View>
      <View style={{ position: "absolute", bottom: 25, right: 25 }}>
        <FAB
          color={color.white}
          style={styles.fab}
          icon="barcode-scan"
          onPress={() => navigation.navigate("Barcode-scan")}
        />
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { HomeScreen };
