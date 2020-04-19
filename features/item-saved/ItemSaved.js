import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const ItemSaved = ({ navigation }) => (
  <View>
    <Text>Thank you for your help, your item has been submited</Text>
    <Button mode="contained" onPress={() => navigation.navigate("Home")}>
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
