import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import styles from "../styles";
import { addPriceState } from "../../../atoms/addPrice";
import { useSetRecoilState } from "recoil";

const IsItDiscount = ({ navigation }) => {
  const setPriceInfo = useSetRecoilState(addPriceState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Is it a discount price ?</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Any-discount-index")}
      >
        Yes
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          setPriceInfo(val => ({ ...val, discountIndex: 0 }));
          navigation.navigate("How-much");
        }}
      >
        No
      </Button>
    </View>
  );
};

IsItDiscount.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { IsItDiscount };
