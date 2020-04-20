import React from "react";
import { View } from "react-native";
import styles from "../styles";

const FlatListItemSeparator = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.separator} />
    </View>
  );
};

export { FlatListItemSeparator };
