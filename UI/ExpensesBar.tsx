import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";

export default function ExpensesBar({
  text,
  summary,
}: {
  text: string;
  summary: number;
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textStyles}>{text}</Text>
      </View>
      <View>
        <Text style={styles.summaryStyles}>${summary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 42,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary100,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    paddingHorizontal: 7,
  },
  textStyles: {
    color: GlobalStyles.colors.primary400,
  },
  summaryStyles: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
