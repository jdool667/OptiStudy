import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Timetable from "./Timetable";
import Settings from "./Settings";
import AddSession from "./AddSession";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  // const username = route.params.username;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Timetable"
        component={Timetable}
        options={{
          tabBarLabel: "Timetable",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
        // initialParams={{ username: username }}
      />

      <Tab.Screen
        name="AddSession"
        component={AddSession}
        options={{
          tabBarLabel: "Add Session",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
        // initialParams={{ username: username }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
        // initialParams={{ username: username }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
