import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Button, View, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="recent-expenses"
        options={{
          headerTitle: "Recent expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bitbucket-square" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: 10,
              }}
            >
              <Link href="new-expense" asChild>
                <TouchableOpacity>
                  <AntDesign name="plus" size={21} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar-times-o" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: 10,
              }}
            >
              <Link href="new-expense" asChild>
                <TouchableOpacity>
                  <AntDesign name="plus" size={21} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
