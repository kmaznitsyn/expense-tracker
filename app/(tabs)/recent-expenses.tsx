import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import React, { useEffect, useState } from "react";
import ExpensesBar from "@/UI/ExpensesBar";
import ExpenseList from "@/components/ExpenseList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getRecentDate } from "@/util/date";

const RecentExpenses = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const now = new Date();
  const recentDate = getRecentDate(7, now);
  const recentExpenses = expenses.filter(
    (expense) =>
      expense.date.getTime() > recentDate.getTime() &&
      expense.date.getTime() < now.getTime()
  );

  const summaryPrice = recentExpenses.reduce(
    (sum, current) => sum + current.price,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <ExpensesBar text="Last 7 days" summary={summaryPrice} />
        <ExpenseList
          emptyExpensesFallbackText="There are no expenses registered during these 7 days."
          expenses={recentExpenses}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: "center",
  },
  itemsContainer: {
    marginTop: 25,
    marginHorizontal: 15,
  },
});

export default RecentExpenses;
