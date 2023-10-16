import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { edit } from "./api/addSession";

const NextSession = ({ route }) => {
  const navigation = useNavigation();

  const nextSessionSubject = route.params.nextDate;
  const item = route.params.item;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
  }, [navigation]);

  const handleDoneButton = () => {
    edit(item, nextSessionSubject);

    navigation.navigate("Timetable");
  };

  // Format the date as DD/MM/YYYY
  const formattedDate = new Date(nextSessionSubject).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your next session will be on {formattedDate}
      </Text>
      <TouchableOpacity style={styles.finishButton} onPress={handleDoneButton}>
        <Text style={styles.finishButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
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

export default NextSession;
