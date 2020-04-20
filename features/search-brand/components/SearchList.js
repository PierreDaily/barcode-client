import React, { useState } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { List, Searchbar } from "react-native-paper";
import styles from "../styles";
import API from "../api";
import logger from "../../../logger";
import getErrMsg from "../helpers";
import { FlatListItemSeparator } from "./FlatListItemSeparator";

const SearchList = ({ navigation, route }) => {
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const navigateToItemDetails = item => {
    navigation.navigate("Item-details", {
      ...route.params,
      brandId: item.id,
      brandName: item.name
    });
  };

  let trimedBrandName = brandName.trim();

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={value => {
          setBrandName(value);
          API.searchBrand(value.trim())
            .then(result => {
              if (result) {
                setBrandList(result);
              }
            })
            .catch(err => logger(err));
        }}
        value={brandName}
        testID="search-bar"
      />
      {trimedBrandName !== "" && (
        <TouchableOpacity
          onPress={() =>
            API.postBrand(trimedBrandName)
              .then(item => navigateToItemDetails(item))
              .catch(err => {
                logger(getErrMsg(err));
                alert(getErrMsg(err));
              })
          }
          testID="new-brand"
        >
          <List.Item title={`Add new brand : "${trimedBrandName}"`} />
          <FlatListItemSeparator />
        </TouchableOpacity>
      )}
      <FlatList
        data={brandList}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToItemDetails(item)}>
            <List.Item title={item.name} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

SearchList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  route: PropTypes.shape({ params: PropTypes.object })
};

export { SearchList };
