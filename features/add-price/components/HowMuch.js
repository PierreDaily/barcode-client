import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { View, Text } from "react-native";
import { Button } from "../../ui";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import styles from "../styles";
import API from "../api";

import { addPriceState } from "../../../atoms/addPrice";
import { useResetRecoilState, useRecoilValue } from "recoil";

const yupSchema = yup.object().shape({
  price: yup
    .number()
    .positive()
    .required()
});

const HowMuch = ({ navigation }) => {
  const priceInfo = useRecoilValue(addPriceState);
  const { branchId, discountIndex, itemId } = priceInfo;
  const resetState = useResetRecoilState(addPriceState);
  return (
    <Formik
      initialValues={{
        price: priceInfo
      }}
      onSubmit={async ({ price }) => {
        try {
          await API.postPrice({
            branchId,
            discountIndex,
            itemId,
            totalPrice: price
          });
          resetState();
          navigation.navigate("Home");
        } catch (err) {
          alert(err);
        }
      }}
      testID="form"
      validationSchema={yupSchema}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => (
        <View style={styles.container}>
          <Text style={styles.text}>
            How much is it ? {priceInfo.totalPrice}
          </Text>
          <TextInput
            error={errors.price}
            label="Price"
            onChangeText={text => setFieldValue("price", text)}
            testID="textInput"
            value={values.name}
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

HowMuch.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { HowMuch };
