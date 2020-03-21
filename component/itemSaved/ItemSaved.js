import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default ({ navigation }) => (
  <View>
    <Text>Thank you for your help, your item has been submited</Text>
    <Button mode="contained" onPress={() => navigation.navigate("Home")}>Home</Button>
  </View>
);
