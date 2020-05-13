import React from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import { Button } from "react-native-paper";

const ButtonPrimary = ({ children, style, testID, onPress }) => (
  <Button
    labelStyle={styles.btnPrimaryText}
    mode="contained"
    onPress={onPress}
    style={[styles.btnPrimary, style]}
    testID={testID}
  >
    {children}
  </Button>
);

ButtonPrimary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string
};

export { ButtonPrimary };
