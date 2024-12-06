import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";

const ProfileScreen = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [steps, setSteps] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [wakeUp, setWakeUp] = useState("");
  const [gender, setGender] = useState(""); // Добавлено состояние для пола

  const saveProfileData = () => {
    if (!age || !weight || !height || !steps || !gender) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    console.log(`Age: ${age}`);
    console.log(`Gender: ${gender}`);
    console.log(`Weight: ${weight} kg`);
    console.log(`Height: ${height} cm`);
    console.log(`Steps: ${steps}`);
    console.log(`Bedtime: ${bedtime}`);
    console.log(`Wake-up: ${wakeUp}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Image
            source={require("../assets/main_icon.png")}
            style={styles.appBarImage}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter your age"
                value={age}
                onChangeText={setAge}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your gender (Male/Female)"
                value={gender}
                onChangeText={setGender}
              />

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter your weight (e.g., 70.5)"
                value={weight}
                onChangeText={setWeight}
              />

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter your height (e.g., 170)"
                value={height}
                onChangeText={setHeight}
              />

              <Text style={styles.sectionTitle}>Fitness Goals</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter your daily step goal"
                value={steps}
                onChangeText={setSteps}
              />

              <Text style={styles.sectionTitle}>Sleep Schedule</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your bedtime (e.g., 10:00 PM)"
                value={bedtime}
                onChangeText={setBedtime}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your wake-up time (e.g., 6:00 AM)"
                value={wakeUp}
                onChangeText={setWakeUp}
              />

              <TouchableOpacity style={styles.button} onPress={saveProfileData}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    paddingTop: 20,
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
  scrollViewContent: {
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF5F6D",
    backgroundColor: "#FF5F6D",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
