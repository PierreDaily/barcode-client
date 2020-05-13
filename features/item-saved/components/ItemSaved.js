import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import styles from "../styles";
import CheckCircle from "../../../assets/img/green-check-circle.svg";

const ItemSaved = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <CheckCircle style={styles.checkCircle} />
      <Text style={styles.text}>Your item has been submited.</Text>
      <Text style={styles.text}>Thank you for your help.</Text>
    </View>
    <Button style={styles.btn} onPress={() => navigation.navigate("Home")}>
      Home
    </Button>
  </View>
);

ItemSaved.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { ItemSaved };
