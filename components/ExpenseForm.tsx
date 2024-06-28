import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "@/UI/Button";
import IconButton from "@/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ExpenseModel } from "@/models/ExpenseModel";

const ExpenseForm = ({
  id,
  title,
  price,
  date,
  onCancel,
  onSubmit,
  canDelete = false,
  onDelete,
}) => {
  const [inputValues, setInputValues] = useState({
    title: title,
    price: price?.toString(),
    date: date?.toISOString().slice(0, 10),
  });

  const [isTitleValid, setTitleValid] = useState(true);
  const [isPriceValid, setPriceValid] = useState(true);
  const [isDateValid, setDateValid] = useState(true);

  const inputChangeHandler = (inputIdentifier: string, enteredValue) => {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  useEffect(() => {
    setTitleValid(true);
  }, [inputValues.title]);

  useEffect(() => {
    setPriceValid(true);
  }, [inputValues.price]);

  useEffect(() => {
    setDateValid(true);
  }, [inputValues.date]);

  const submitHandler = () => {
    const expense: ExpenseModel = new ExpenseModel(
      "test",
      inputValues.title,
      +inputValues.price,
      new Date(inputValues.date)
    );

    const priceIsValid = !isNaN(expense.price) && expense.price > 0;
    const titleIsValid = expense.title && expense.title.trim().length > 0;
    const dateIsValid = expense.date.toString() !== "Invalid Date";
    if (!priceIsValid || !titleIsValid || !dateIsValid) {
      setPriceValid(priceIsValid);
      setTitleValid(titleIsValid);
      setDateValid(dateIsValid);
      return;
    }

    onSubmit(expense);
  };

  return (
    <View style={styles.container}>
      <Input
        label={"Title"}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "title"),
          value: inputValues.title,
        }}
        error={!isTitleValid}
        errorMessage="Invalid title value. It should not be empty."
      />
      <Input
        label={"Price"}
        textInputConfig={{
          keyboardType: "numeric",
          onChangeText: inputChangeHandler.bind(this, "price"),
          value: inputValues.price,
        }}
        error={!isPriceValid}
        errorMessage="Invalid price value. It should be a number and greater than zero."
      />
      <Input
        label={"Date"}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: inputValues.date,
        }}
        error={!isDateValid}
        errorMessage="Invalid price value. It should be a valid date in format 'YYYY-MM-DD'."
      />

      <View style={styles.buttonGroup}>
        <Button title="Cancel" variant="flat" onPress={onCancel} />
        <Button title="Submit" onPress={submitHandler} />
      </View>

      {canDelete && (
        <View style={styles.deleteButtonStyles}>
          <IconButton
            icon="trash"
            size={32}
            color={GlobalStyles.colors.error500}
            onPress={onDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 20,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: "row",
    gap: 22,
    alignSelf: "center",
  },
  deleteButtonStyles: {
    marginTop: 15,
    alignSelf: "center",
  },
});
