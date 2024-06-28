import { View, Text, FlatList, StyleSheet } from "react-native";
import { ExpenseModel } from "@/models/ExpenseModel";
import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({
  expenses,
  emptyExpensesFallbackText,
}: {
  expenses: ExpenseModel[];
  emptyExpensesFallbackText: string;
}) {
  if (!expenses || expenses.length === 0) {
    return (
      <Text style={styles.noExpensesStyles}>{emptyExpensesFallbackText}</Text>
    );
  }

  return (
    <FlatList
      renderItem={(expense) => (
        <ExpenseItem
          id={expense.item.id}
          title={expense.item.title}
          price={expense.item.price}
          date={expense.item.date}
        />
      )}
      data={expenses}
    />
  );
}

const styles = StyleSheet.create({
  noExpensesStyles: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 35,
    color: "white",
  },
});
