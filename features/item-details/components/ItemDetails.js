import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "../../ui/components";
import styles from "../styles";
import Logo from "../../../assets/img/green-barcode.svg";

const yupSchema = yup.object().shape({
  brandId: yup.number().required(),
  brandName: yup.string().required(),
  name: yup.string().required()
});

const ItemDetails = ({ route, navigation }) => {
  const {
    params: { brandId, brandName, barcode, type }
  } = route;

  return (
    <Formik
      initialValues={{
        name: ""
      }}
      validateOnChange={false}
      validate={async values => {
        const errors = {};
        try {
          await yupSchema.validate({
            brandId,
            brandName,
            name: values.name
          });
        } catch (err) {
          errors[err.path] = err.message;
        }

        return errors;
      }}
      onSubmit={values =>
        navigation.navigate("Item-photo", {
          barcode,
          brand: brandId,
          name: values.name,
          type
        })
      }
      testID="form"
    >
      {({ errors, handleSubmit, setFieldValue, values }) => (
        <View style={styles.container}>
          <Logo style={styles.logo} />
          <View>
            <TextInput
              error={errors.name}
              label="Product name"
              onChangeText={text => setFieldValue("name", text)}
              style={styles.nameInput}
              testID="textInput"
              value={values.name}
            />

            <TextInput
              error={errors.brandName}
              label="Brand Name"
              style={styles.brandInput}
              value={brandName || ""}
              onFocus={() =>
                navigation.navigate("Search", {
                  barcode,
                  type
                })
              }
              testID="search"
            />
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.btn}
            testID="submit"
          >
            Next
          </Button>
        </View>
      )}
    </Formik>
  );
};

ItemDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  route: PropTypes.shape({ params: PropTypes.object })
};

export { ItemDetails };
