import { ExpenseModel } from "@/models/ExpenseModel";
import { getRecentDate } from "@/util/date";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ExpensesInitialState {
  items: ExpenseModel[];
  recentItems: ExpenseModel[];
}

const initialState: ExpensesInitialState = {
  items: [],
  recentItems: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseModel>) => {
      state.items.push(action.payload);
    },
    setExpenses: (state, action: PayloadAction<ExpenseModel[]>) => {
      console.log(action.payload);
      state.items = action.payload;
    },
    deleteExpense: (state, action: PayloadAction<String>) => {
      state.items.splice(
        state.items.findIndex((item) => item.id === action.payload),
        1
      );
    },
    updateExpense: (state, action: PayloadAction<ExpenseModel>) => {
      const updatingExpenseIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[updatingExpenseIndex] = action.payload;
    },
    getRecentExpenses: (state) => {
      const now = new Date();
      const recentDate = getRecentDate(7, now);
      state.recentItems = state.items.filter(
        (expense) =>
          expense.date.getTime() > recentDate.getTime() &&
          expense.date.getTime() < now.getTime()
      );
    },
  },
});

export default expensesSlice.reducer;
export const {
  addExpense,
  deleteExpense,
  updateExpense,
  setExpenses,
  getRecentExpenses,
} = expensesSlice.actions;
