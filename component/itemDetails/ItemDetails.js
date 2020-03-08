import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  Picker
} from "react-native";
import API from "../api/api";

const getBrandList = () => API.get(`/brand`);

export default ItemDetails = ({ route, navigation }) => {
  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);
  const [name, setName] = useState(null);

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
      <Text>{route.params.EAN}</Text>
      <Text>Name</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text>Brand</Text>
      <Picker
        selectedValue={brand}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setBrand(itemValue)}
      >
        {brandList.length > 0 &&
          brandList.map(brand => (
            <Picker.Item label={brand.name} key={brand.id} value={brand.id} />
          ))}
      </Picker>

      <Button
        title="Submit"
        onPress={() =>
          navigation.navigate("Item-photo", { ...route.params, brand, name })
        }
      />
    </View>
  );
};
