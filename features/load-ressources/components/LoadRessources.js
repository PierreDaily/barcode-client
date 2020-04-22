import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const LoadRessources = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const _cacheResourcesAsync = async () => {
    return Font.loadAsync({
      "Montserrat-Medium": require("../../../assets/fonts/Montserrat-Medium.ttf")
    });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return children;
};

LoadRessources.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { LoadRessources };
