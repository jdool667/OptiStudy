import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getSessions } from "./api/addSession";

const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const Timetable = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
  }, [navigation]);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getSessions().then((data) => {
      setData(data);
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      getSessions().then((data) => {
        setData(data);
      });
    }, [])
  );

  const renderItem = ({ item }) => {
    const formattedDate = item.toLocaleDateString("en-GB");
    const eventsForDate = data.filter((event) => event.date === formattedDate);

    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <View style={styles.eventContainer}>
          {eventsForDate.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventItem}
              onPress={() => {
                // Navigate to the SessionDetails screen with session data as a parameter
                navigation.navigate("SessionDetails", { session: event });
              }}
            >
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventSubject}>{event.subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const currentDate = new Date(); // Get the current date
  const endDate = new Date(currentDate); // Create a copy of the current date
  endDate.setMonth(endDate.getMonth() + 1); // Add one month to the current date
  const startDate = new Date(); // Start date is the current date
  const dateRange = generateDateRange(startDate, endDate);

  return (
    <View style={styles.container}>
      <FlatList
        data={dateRange}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 28, // Larger font size
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333333", // Normal text color
  },
  dateContainer: {
    marginBottom: 16,
    borderWidth: 1, // Border around each date section
    borderColor: "#EAEAEA", // Light grey border color
    borderRadius: 8, // Rounded corners for the border
    padding: 16, // Add some padding within the border
    backgroundColor: "#FFFFFF", // White background
  },
  dateText: {
    fontSize: 20, // Slightly larger date text
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333", // Normal text color
  },
  eventContainer: {
    marginTop: 8,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  eventTime: {
    marginRight: 16,
    fontWeight: "normal", // Normal font weight
    color: "#333333", // Normal text color
  },
  eventSubject: {
    color: "#333333", // Normal text color
    fontSize: 16, // Slightly smaller font size
  },
});
