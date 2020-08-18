import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import styles from "../styles";

import { addPriceState } from "../../../atoms/addPrice";
import { useRecoilState } from "recoil";

const yupSchema = yup.object().shape({
  discountIndex: yup
    .number()
    .positive()
    .required()
});

const DiscountIndexQuantity = ({ navigation }) => {
  const [priceInfo, setPriceInfo] = useRecoilState(addPriceState);
  return (
    <Formik
      initialValues={{
        discountIndex: priceInfo.discountIndex
      }}
      onSubmit={({ discountIndex }) => {
        setPriceInfo(val => ({ ...val, discountIndex }));
        navigation.navigate("How-much");
      }}
      testID="form"
      validationSchema={yupSchema}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => (
        <View style={styles.container}>
          <Text style={styles.text}>
            How many items do you need to buy to get discount ?
          </Text>
          <TextInput
            error={errors.price}
            label="Quantity"
            onChangeText={text => setFieldValue("discountIndex", text)}
            testID="textInput"
            value={values.discountIndex}
            style={styles.priceInput}
          />
          <Button mode="contained" onPress={handleSubmit} testID="submit">
            Next
          </Button>
        </View>
      )}
    </Formik>
  );
};

DiscountIndexQuantity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { DiscountIndexQuantity };
