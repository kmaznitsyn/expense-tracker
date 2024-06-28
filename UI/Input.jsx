import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";

const Input = ({ label, textInputConfig, error, errorMessage }) => {
  const inputStyles = [styles.textInput];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
      {error && errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  label: {
    color: GlobalStyles.colors.primary200,
    paddingBottom: 2,
    fontSize: 11,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary200,
    color: GlobalStyles.colors.primary700,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary200,
    borderRadius: 7,
    padding: 7,
  },
  inputMultiline: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  errorMessage: {
    color: "red",
  },
});
