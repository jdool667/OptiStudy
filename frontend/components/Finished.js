import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const Finished = ({ route }) => {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState(5); // State for difficulty rating

  const item = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: item.subject, headerShown: true });
  }, [navigation]);

  let nextDate; // Declare nextDate as a global variable

  const calculateNextDate = (item, difficulty) => {
    const difficultyMultipliers = {
      10: 0.1,
      9: 0.2,
      8: 0.3,
      7: 0.4,
      6: 0.5,
      5: 1,
      4: 2,
      3: 3,
      2: 4,
      1: 5,
    };

    let multiplier = difficultyMultipliers[difficulty] || 0;

    const dateParts = item.date.split("/"); // Split the date string into day, month, and year
    const day = parseInt(dateParts[0], 10); // Parse the day as an integer
    const month = parseInt(dateParts[1] - 1, 10); // Parse the month (subtract 1 as months are 0-based)
    const year = parseInt(dateParts[2], 10); // Parse the year

    nextDate = new Date(year, month, day); // Construct a Date object
    nextDate.setDate(nextDate.getDate() + multiplier * item.last);

    return nextDate; // Return the calculated nextDate
  };

  const handleFinishSession = () => {
    const nextDate = calculateNextDate(item, difficulty); // Calculate the nextDate
    navigation.navigate("NextSession", {
      nextDate: nextDate.toISOString(),
      item,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        How hard was the session? (1 being easy, 10 being hard):
      </Text>
      <Picker
        selectedValue={difficulty}
        style={styles.picker}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinishSession}
      >
        <Text style={styles.finishButtonText}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Finished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
    borderColor: "#EAEAEA", // Light grey border color
    borderWidth: 1,
    borderRadius: 8, // Rounded corners for the border
  },
  finishButton: {
    backgroundColor: "#4CAF50", // Green color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
