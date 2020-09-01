import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import styles from "../styles";
import { addPriceState } from "../../../atoms/addPrice";
import { useSetRecoilState } from "recoil";

const AnyDiscountIndex = ({ navigation }) => {
  const setPriceInfo = useSetRecoilState(addPriceState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Do you need to purchase more than one item to get discount ?
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Discount-index-quantity")}
      >
        Yes
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          setPriceInfo(val => ({ ...val, discountIndex: 1 }));
          navigation.navigate("How-much");
        }}
      >
        No
      </Button>
    </View>
  );
};

AnyDiscountIndex.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { AnyDiscountIndex };
