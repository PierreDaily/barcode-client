import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import styles from "../styles";
import { RadioButton } from "react-native-paper";
import { addPriceState } from "../../../atoms/addPrice";
import { useRecoilState } from "recoil";

const SelectBranch = ({ navigation }) => {
  const [priceInfo, setPriceInfo] = useRecoilState(addPriceState);

  const updateBranchId = branchId =>
    setPriceInfo(val => ({ ...val, branchId }));

  return (
    <View style={styles.container}>
      <Text>Wellcome</Text>
      <RadioButton
        value="Wellcome"
        status={priceInfo.branchId === 1 ? "checked" : "unchecked"}
        onPress={() => updateBranchId(1)}
      />
      <Text>Park&Shop</Text>
      <RadioButton
        value="Park And Shop"
        status={priceInfo.branchId === 2 ? "checked" : "unchecked"}
        onPress={() => updateBranchId(2)}
      />
      <Text>7-Eleven</Text>
      <RadioButton
        value="7-Eleven"
        status={priceInfo.branchId === 3 ? "checked" : "unchecked"}
        onPress={() => updateBranchId(3)}
      />
      <Text style={styles.text}>Please select a branch</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Is-it-discount")}
        testID="submit"
      >
        Next
      </Button>
    </View>
  );
};

SelectBranch.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { SelectBranch };
