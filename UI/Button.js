import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";

const Button = ({ title, onPress, variant = "primary" }) => {
  return (
    <View style={[styles.container, variant == "flat" && styles.flatStyles]}>
      <Pressable style={styles.pressableStyles} onPress={onPress}>
        <Text style={styles.textStyles}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary500,
    width: "30%",
    alignItems: "center",
    borderRadius: 5,
  },
  pressableStyles: {
    padding: 6,
  },
  textStyles: {
    color: GlobalStyles.colors.primary50,
  },
  flatStyles: {
    backgroundColor: "transparent",
  },
});
