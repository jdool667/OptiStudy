import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { add } from "./api/addSession";

const AddSession = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(""); // State for start date
  const [studyTime, setStudyTime] = useState(""); // State for study time
  const [subject, setSubject] = useState(""); // State for subject name
  const [difficulty, setDifficulty] = useState(5); // State for difficulty rating

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
  }, [navigation]);

  const saveSession = () => {
    // You can save the session here (e.g., to a database or your data array)
    // For now, let's just log the selected values.
    if (!startDate || !studyTime || !subject || !difficulty) {
      alert("Please fill in all fields");
      return;
    }

    if (!startDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      alert("Please enter a valid date");
      return;
    }

    if (!studyTime.match(/^\d{2}:\d{2}$/)) {
      alert("Please enter a valid time");
      return;
    }

    if (!subject.match(/^[a-zA-Z]+$/)) {
      alert("Please enter a valid subject");
      return;
    }

    if (difficulty < 1 || difficulty > 10) {
      alert("Please enter a valid difficulty");
      return;
    }

    add({
      date: startDate,
      time: studyTime,
      subject,
      last: difficulty,
    }).then((data) => {
      if (data.message == "Session already scheduled") {
        alert(
          "A session is already scheduled for this time and date, reschedule"
        );
        return;
      }

      alert("Session added");
      navigation.navigate("Timetable");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Start Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />

      <Text style={styles.label}>Study Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={studyTime}
        onChangeText={(text) => setStudyTime(text)}
      />

      <Text style={styles.label}>Subject:</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject Name"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <Text style={styles.label}>Difficulty (1 being easy, 10 being ):</Text>
      <Picker
        selectedValue={difficulty}
        style={styles.picker}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.finishButton} onPress={saveSession}>
        <Text style={styles.finishButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  input: {
    height: 40,
    borderColor: "#EAEAEA", // Light grey border color
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8, // Rounded corners for the border
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

export default AddSession;
