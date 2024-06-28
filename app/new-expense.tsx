import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "@/constants/styles";
import Button from "../UI/Button";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addExpense } from "@/store/expenses";
import ExpenseForm from "@/components/ExpenseForm";
import { ExpenseModel } from "@/models/ExpenseModel";
import { storeExpense } from "@/util/http";
import LoadingOverlay from "@/UI/LoadingOverlay";

const NewExpense = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const cancelHandler = () => {
    router.back();
  };

  const addHandler = async (newExpense: ExpenseModel) => {
    setSubmitting(true);
    const id = await storeExpense(newExpense);
    newExpense.id = id;
    dispatch(addExpense(newExpense));
    console.log(JSON.stringify(newExpense));
    setSubmitting(false);
    router.back();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onCancel={cancelHandler} onSubmit={addHandler} />
    </View>
  );
};

export default NewExpense;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: GlobalStyles.colors.primary800,
    width: "100%",
  },
});
