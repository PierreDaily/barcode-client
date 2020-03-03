import React from "react";
import { Button, View, Text } from "react-native";

export default ({ navigation }) => (
  <View>
    <Text>Thank you for your help, your item has been submited</Text>
    <Button title="Home" onPress={() => navigation.navigate("Home")}></Button>
  </View>
);
