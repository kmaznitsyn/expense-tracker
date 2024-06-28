import { View, Text, StyleSheet, Touchable, Pressable } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";
import { Link } from "expo-router";

export default function ExpenseItem({
  id,
  title,
  price,
  date,
}: {
  id: string;
  title: string;
  price: number;
  date: Date;
}) {
  const expensePressHandler = () => {};

  return (
    <Link
      href={{ pathname: "/edit-expense", params: { id } }}
      asChild
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Pressable onPress={expensePressHandler}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.titleTextStyles}>{title}</Text>
            <Text style={styles.dateTextStyles}>
              {date.toISOString().slice(0, 10)}
            </Text>
          </View>
          <View style={styles.priceStyles}>
            <Text style={styles.priceTextStyles}>{price}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary500,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    gap: 4,
  },
  titleTextStyles: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
  },
  dateTextStyles: {
    color: GlobalStyles.colors.primary50,
  },
  priceStyles: {
    borderWidth: 3,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 6,
    color: GlobalStyles.colors.primary400,
    alignItems: "center",
    justifyContent: "center",
    width: 73,
    height: 45,
  },
  priceTextStyles: {
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
