import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "@/constants/styles";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "@/store/expenses";
import { useLocalSearchParams } from "expo-router";
import ExpenseForm from "../components/ExpenseForm";
import { RootState } from "@/store/store";
import { ExpenseModel } from "@/models/ExpenseModel";
import {
  updateExpense as httpUpdateExpense,
  deleteExpense as httpDeleteExpense,
} from "@/util/http";
import LoadingOverlay from "@/UI/LoadingOverlay";

const EditExpense = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const { id } = useLocalSearchParams();

  const [isSubmitting, setSubmitting] = useState(false);

  const editingExpense = expenses.find((item) => item.id === id);

  const cancelHandler = () => {
    router.back();
  };

  const updateHandler = async (updatedExpense: ExpenseModel) => {
    setSubmitting(true);
    updatedExpense.id = id;
    dispatch(updateExpense(updatedExpense));
    await httpUpdateExpense(id, updatedExpense);
    setSubmitting(false);
    router.back();
  };

  const deleteHandler = async () => {
    dispatch(deleteExpense(id));
    await httpDeleteExpense(id);
    router.back();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        id={editingExpense?.id}
        title={editingExpense?.title}
        price={editingExpense?.price}
        date={editingExpense?.date}
        onCancel={cancelHandler}
        onSubmit={updateHandler}
        canDelete={true}
        onDelete={deleteHandler}
      />
    </View>
  );
};

export default EditExpense;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: GlobalStyles.colors.primary800,
    width: "100%",
  },
});
