import React from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import { Button } from "react-native-paper";

const ButtonPrimary = ({ children, style, testID, onPress, variant }) => (
  <Button
    labelStyle={styles[`${variant}Text`]}
    mode="contained"
    onPress={onPress}
    style={[styles[variant], style]}
    testID={testID}
  >
    {children}
  </Button>
);

ButtonPrimary.defaultProps = {
  variant: "primary"
};

ButtonPrimary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string,
  variant: PropTypes.string
};

export { ButtonPrimary as Button };
