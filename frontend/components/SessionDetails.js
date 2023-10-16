// SessionDetails.js

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SessionDetails = ({ route }) => {
  const navigation = useNavigation();
  // Get the session data from the route parameters
  const { session } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: session.subject, headerShown: true });
  }, [navigation]);

  const handleFinishSession = () => {
    // Implement the logic to finish the session here
    // For now, let's just navigate back to the previous screen
    navigation.navigate("Finished", session);
  };

  return (
    <View style={styles.container}>
      <Text>Date: {session.date}</Text>
      <Text>Time: {session.time}</Text>
      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinishSession}
      >
        <Text style={styles.finishButtonText}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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

export default SessionDetails;
