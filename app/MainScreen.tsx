import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import * as dbHelper from "../db/dbHelper";

const MainScreen = () => {
  const [currentDate, setCurrentDate] = useState("");

  const recommendations = [
    "Eat healthy food",
    "Exercise regularly",
    "Set a daily goal",
    "Drink more water",
    "Get enough sleep",
  ];

  const activityData = [
    {
      name: "Temperature",
      value: "36.6°C",
      icon: require("../assets/temperature.png"),
    },
    { name: "Heart", value: 72, icon: require("../assets/heart.png") },
    {
      name: "Pressure",
      value: "120/80 mmHg",
      icon: require("../assets/pressure.png"),
    },
    { name: "Weight", value: 70, icon: require("../assets/weight.png") },
    { name: "Time sleep", value: 8, icon: require("../assets/sleep.png") },
    { name: "Steps", value: 10235, icon: require("../assets/steps.png") },
  ];

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await dbHelper.createTables();

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = today.getMonth();
        const year = today.getFullYear();

        const monthName = today.toLocaleString("default", { month: "long" });

        const currentDateStringForDB = `${day}.${String(month + 1).padStart(
          2,
          "0"
        )}`;
        setCurrentDate(`${day} ${monthName} ${year}`);

        // await dbHelper.addDate("01.12");
        // await dbHelper.addDate("02.12");
        // await dbHelper.addDate("03.12");
        // await dbHelper.addDate("04.12");
      } catch (error) {
        console.error("Error setting up database:", error);
      }
    };

    setupDatabase();
  }, []);

  const handleDeleteDatabase = async () => {
    try {
      await dbHelper.resetDatabase();
      Alert.alert("Success", "Database cleared successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to clear the database. Try again.");
      console.error("Error clearing database:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Image
            source={require("../assets/main_icon.png")}
            style={styles.appBarImage}
          />
          {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteDatabase}
          >
            <Text style={styles.deleteButtonText}>Clear DB</Text>
          </TouchableOpacity> */}
        </View>

        <FlatList
          data={[
            {
              key: "dateContainer",
              content: (
                <View style={styles.dateContainer}>
                  <Text style={styles.day}>{currentDate.split(" ")[0]}</Text>
                  <Text style={styles.monthYear}>
                    {currentDate.slice(currentDate.indexOf(" ") + 1)}
                  </Text>
                </View>
              ),
            },
            {
              key: "activitySection",
              content: (
                <>
                  <Text style={styles.sectionTitle}>YOUR ACTIVITY</Text>
                  <FlatList
                    data={activityData}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <View style={styles.gridItem}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.gridItemText}>{item.name}</Text>
                        <Text style={styles.gridItemValue}>{item.value}</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.name}
                  />
                </>
              ),
            },
            {
              key: "tipsSection",
              content: (
                <>
                  <Text style={styles.sectionTitle}>TODAY'S TIPS</Text>
                  <FlatList
                    data={recommendations}
                    renderItem={({ item }) => (
                      <View style={styles.tipItem}>
                        <Text style={styles.tipText}>{item}</Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ),
            },
          ]}
          renderItem={({ item }) => <View key={item.key}>{item.content}</View>}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8d7da",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8d7da",
    paddingTop: 50,
  },
  appBar: {
    height: 60,
    backgroundColor: "#765D60",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  appBarImage: {
    width: 35,
    height: 35,
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  day: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#000000",
  },
  monthYear: {
    fontSize: 18,
    color: "#000000",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginVertical: 20,
    textAlign: "center",
  },
  gridItem: {
    backgroundColor: "#e6a1a1",
    paddingVertical: 20,
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 100,
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  gridItemValue: {
    fontSize: 14,
    color: "#000000",
  },
  icon: {
    width: 40,
    height: 40,
  },
  tipItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#e6a1a1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tipText: {
    fontSize: 16,
    color: "#000",
  },
});

export default MainScreen;
