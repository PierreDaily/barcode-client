import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import { Text, View, StyleSheet, Picker } from "react-native";
import { Button, TextInput } from "react-native-paper";
import API from "../api/api";
import logger from "./../../logger";

const getBrandList = () => API.get(`/brand`);

const yupSchema = yup.object().shape({
  brand: yup.string().required(),
  name: yup.string().required()
});

const ItemDetails = ({ route, navigation }) => {
  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    getBrandList()
      .then(({ data }) => {
        setBrand(data[0].id);
        setBrandList(data);
      })
      .catch(err => {
        logger("brand list can't be fetched");
        alert(err);
      });
  }, []);

  return (
    <View>
      <Text>Barcode: {route.params.barcode}</Text>
      {brand ? (
        <Formik
          initialValues={{ name: "" }}
          validateOnChange={false}
          validationSchema={yupSchema}
          onSubmit={values =>
            navigation.navigate("Item-photo", {
              ...route.params,
              brand: values.brand,
              name: values.name
            })
          }
          testID="form"
        >
          {({ errors, handleSubmit, setFieldValue, values }) => (
            <View>
              <TextInput
                error={errors.name}
                label="Name"
                onChangeText={text => setFieldValue("name", text)}
                value={values.name}
              />

              <Text>Brand</Text>
              <Picker
                selectedValue={values.brand}
                style={[
                  { height: 50, width: 200 },
                  errors.brand && styles.error
                ]}
                onValueChange={itemValue => setFieldValue("brand", itemValue)}
              >
                {brandList.length > 0 &&
                  brandList.map(brand => (
                    <Picker.Item
                      label={brand.name}
                      key={brand.id}
                      value={brand.id}
                    />
                  ))}
              </Picker>
              <Button mode="contained" onPress={handleSubmit}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      ) : (
        <Text testID="loading">Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red"
  }
});

ItemDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  route: PropTypes.shape({ params: PropTypes.object })
};

export default ItemDetails;
