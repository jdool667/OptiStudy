import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

export default function Settings() {
  const navigation = useNavigation();
  const [sessionDuration, setSessionDuration] = useState(60); // Default value

  const saveSettings = () => {
    // You can save the settings here (e.g., to AsyncStorage or a state management solution)
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: false,
    });
  }, [navigation, sessionDuration]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Session Duration (minutes):</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={120}
        step={10}
        value={sessionDuration}
        onValueChange={(value) => setSessionDuration(value)}
        minimumTrackTintColor="#4CAF50" // Custom track color
        maximumTrackTintColor="#EAEAEA" // Custom track color
        thumbTintColor="#4CAF50" // Custom thumb color
      />
      <Text style={styles.duration}>{sessionDuration} minutes</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    marginBottom: 16,
  },
  duration: {
    fontSize: 16,
    marginTop: -8,
    textAlign: "center",
  },
});
