import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import styles from "../styles";
import CheckCircle from "../../../assets/img/green-check-circle.svg";

const ItemSaved = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CheckCircle style={styles.checkCircle} />
        <Text style={styles.text}>Your item has been submited.</Text>
        <Text style={styles.text}>
          Would you like to help the community and input the price ?
        </Text>
      </View>
      <Button
        style={styles.btn__yes}
        onPress={() => {
          navigation.navigate("Add-price");
        }}
        testID="yesBtn"
      >
        Yes
      </Button>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
        testID="noBtn"
      >
        No
      </Button>
    </View>
  );
};

ItemSaved.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { ItemSaved };
