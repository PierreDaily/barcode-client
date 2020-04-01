import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const yupSchema = yup.object().shape({
  brandId: yup.number().required(),
  brandName: yup.string().required(),
  name: yup.string().required(),
});

const ItemDetails = ({ route, navigation }) => {
  const {
    params: { brandId, brandName, barcode, type },
  } = route;

  return (
    <View>
      <Text>Barcode: {route.params.barcode}</Text>
      {
        <Formik
          initialValues={{
            name: "",
          }}
          validateOnChange={false}
          validate={async (values) => {
            const errors = {};
            try {
              await yupSchema.validate({
                brandId,
                brandName,
                name: values.name,
              });
            } catch (err) {
              errors[err.path] = err.message;
            }

            return errors;
          }}
          onSubmit={(values) =>
            navigation.navigate("Item-photo", {
              barcode,
              brand: brandId,
              name: values.name,
              type,
            })
          }
          testID="form"
        >
          {({ errors, handleSubmit, setFieldValue, values }) => {
            return (
              <View>
                <TextInput
                  error={errors.name}
                  label="Name"
                  onChangeText={(text) => setFieldValue("name", text)}
                  testID="textInput"
                  value={values.name}
                />

                <Text>Brand</Text>
                <TextInput
                  error={errors.brandName}
                  label="Brand Name"
                  value={brandName || ""}
                  disabled
                />
                <Button
                  mode="contained"
                  onPress={() =>
                    navigation.navigate("Search", {
                      barcode,
                      type,
                    })
                  }
                  testID="search"
                >
                  Select brand
                </Button>
                <Button mode="contained" onPress={handleSubmit} testID="submit">
                  Submit
                </Button>
              </View>
            );
          }}
        </Formik>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

ItemDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({ params: PropTypes.object }),
};

export default ItemDetails;
