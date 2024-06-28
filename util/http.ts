import { ExpenseModel } from "@/models/ExpenseModel";
import axios from "axios";
import { getRecentDate } from "./date";

const dbUrl =
  "https://react-native-expense-app-58daa-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(expenseData: ExpenseModel) {
  const response = await axios.post(dbUrl + "/expenses.json", expenseData);
  const id = await response.data.name;
  return id;
}

export async function fetchExpenses(): Promise<ExpenseModel[]> {
  const response = await axios.get(dbUrl + "/expenses.json");
  const expenses: ExpenseModel[] = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      title: response.data[key].title,
      price: response.data[key].price,
      date: new Date(response.data[key].date),
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id: string, expenseData: ExpenseModel) {
  return axios.put(dbUrl + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id: string) {
  axios.delete(dbUrl + `/expenses/${id}.json`);
}
