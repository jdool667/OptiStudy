import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import SessionDetails from "./components/SessionDetails";
import Finished from "./components/Finished";
import NextSession from "./components/NextSession";
import AddSession from "./components/AddSession";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SessionDetails" component={SessionDetails} />
        <Stack.Screen name="Finished" component={Finished} />
        <Stack.Screen name="NextSession" component={NextSession} />
        <Stack.Screen name="AddSession" component={AddSession} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
