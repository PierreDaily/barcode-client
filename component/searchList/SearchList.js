import React, { useState } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { List, Searchbar } from "react-native-paper";
import API from "./api";
import logger from "../../logger";
import getErrMsg from "./helpers";

const SearchList = ({ navigation, route }) => {
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const navigateToItemDetails = (item) => {
    navigation.navigate("Item-details", {
      ...route.params,
      brandId: item.id,
      brandName: item.name,
    });
  };

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => {
          setBrandName(value);
          API.searchBrand(value)
            .then((result) => {
              if (result) {
                setBrandList(result);
              }
            })
            .catch((err) => logger(err));
        }}
        value={brandName}
        testID="search-bar"
      />
      {brandName !== "" && (
        <TouchableOpacity
          onPress={() =>
            API.postBrand(brandName)
              .then((item) => navigateToItemDetails(item))
              .catch((err) => {
                logger(getErrMsg(err));
                alert(getErrMsg(err));
              })
          }
          testID="new-brand"
        >
          <List.Item title={`Add new brand : "${brandName}"`} />
        </TouchableOpacity>
      )}
      <FlatList
        data={brandList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToItemDetails(item)}>
            <List.Item title={item.name} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

SearchList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({ params: PropTypes.object }),
};

export default SearchList;
