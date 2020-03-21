import React, { useState, useEffect } from "react";
import { Formik } from "formik"
import * as yup from 'yup';
import {
  Text,
  View,
  StyleSheet,
  Picker
} from "react-native";
import { Button, TextInput } from 'react-native-paper';
import API from "../api/api";

const getBrandList = () => API.get(`/brand`);

const yupSchema = yup.object().shape({
  brand: yup.string().required(),
  name: yup
    .string()
    .required()
});

export default ItemDetails = ({ route, navigation }) => {
  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    getBrandList()
      .then(({ data }) => {
        setBrandList(data);
        setBrand(data[0].id);
      })
      .catch(err => alert(err));
  }, []);

  return (
    <View>
      <Text>Barcode: {route.params.barcode}</Text>
      {brand && (<Formik
        initialValues={{ name: '' }}
        validateOnChange={false}
        validationSchema={yupSchema}
        onSubmit={(values) => navigation.navigate("Item-photo", { ...route.params, brand: values.brand, name: values.name })}
      >
        {({ errors, handleSubmit, setFieldValue, values }) => <View>
          <TextInput
            error={errors.name}
            label="Name"
            onChangeText={text => setFieldValue('name', text)}
            value={values.name}
          />

          <Text>Brand</Text>
          <Picker
            selectedValue={values.brand}
            style={[{ height: 50, width: 200 }, errors.brand && styles.error]}
            onValueChange={(itemValue, itemIndex) => setFieldValue('brand', itemValue)}
          >
            {brandList.length > 0 &&
              brandList.map(brand => (
                <Picker.Item label={brand.name} key={brand.id} value={brand.id} />
              ))}
          </Picker>
          <Button
            mode="contained"
            onPress={handleSubmit}
          >Submit</Button>
        </View>}
      </Formik>)}
    </View >
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
