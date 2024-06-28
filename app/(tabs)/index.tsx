import { View, Text, StyleSheet } from "react-native";
import ExpensesBar from "../../UI/ExpensesBar";
import { GlobalStyles } from "../../constants/styles";
import React, { useEffect, useState } from "react";
import ExpenseList from "@/components/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchExpenses } from "@/util/http";
import LoadingOverlay from "@/UI/LoadingOverlay";
import ErrorOverlay from "@/UI/ErrorOverlay";
import { setExpenses } from "@/store/expenses";

const AllExpenses = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const dispatch = useDispatch();
  const summaryPrice = expenses.reduce(
    (sum, current) => sum + current.price,
    0
  );
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<String>();

  useEffect(() => {
    async function getExpenses() {
      setLoading(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch Expenses");
      }

      setLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <ErrorOverlay message={error} onConfirm={() => setError(undefined)} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <ExpensesBar text="Total" summary={summaryPrice} />
        <ExpenseList
          emptyExpensesFallbackText="There are no expenses registered."
          expenses={expenses}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
  itemsContainer: {
    marginTop: 25,
    marginHorizontal: 15,
  },
});

export default AllExpenses;
