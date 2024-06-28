import { Stack } from "expo-router/stack";
import { Button } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { GlobalStyles } from "@/constants/styles";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new-expense"
          options={{
            headerTitle: "Add expense",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="edit-expense"
          options={{
            headerTitle: "Edit expense",
            presentation: "modal",
          }}
        />
      </Stack>
    </Provider>
  );
}
