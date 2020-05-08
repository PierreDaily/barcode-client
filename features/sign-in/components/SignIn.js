import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import styles from "../styles";
import { color } from "../../../constants";
import { Formik } from "formik";
import * as yup from "yup";
import { customAPI } from "../api";
import { Tokens } from "../../../api";

// Minimum eight characters, at least one uppercase letter,
// one lowercase letter, one number and one special character

const pwdRegEx = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .matches(pwdRegEx)
    .required()
});

const SignIn = ({ navigation }) => {
  const handleSubmit = values =>
    customAPI
      .authenticate(values.email, values.password)
      .then(result => {
        const auth = new Tokens();
        auth.accessToken = result.access_token;
        auth.refreshToken = result.refresh_token;
        navigation.navigate("Home");
      })
      .catch(() => alert("email/password is incorrect"));

  return (
    <View style={styles.page}>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validateOnChange={false}
        validationSchema={yupSchema}
        onSubmit={handleSubmit}
        testID="form"
      >
        {({ errors, handleSubmit, setFieldValue, values }) => {
          return (
            <View style={styles.container}>
              <TextInput
                error={errors.email}
                label="Email"
                onChangeText={text => setFieldValue("email", text)}
                style={styles.textInput}
                testID="email-input"
                value={values.email}
              />

              <TextInput
                error={errors.password}
                label="Password"
                onChangeText={text => setFieldValue("password", text)}
                style={styles.textInput}
                testID="password-input"
                value={values.password}
              />

              <Button
                labelStyle={{ color: color.white }}
                mode="contained"
                style={styles["btn__sign-in"]}
                onPress={handleSubmit}
                testID="log-in"
              >
                Log in
              </Button>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export { SignIn };
