import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const ProfileScreen = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [steps, setSteps] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [wakeUp, setWakeUp] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);

  const saveProfileData = () => {
    if (!age || !weight || !height || !steps || !selectedGender) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    console.log(`Age: ${age}`);
    console.log(`Gender: ${selectedGender}`);
    console.log(`Weight: ${weight} kg`);
    console.log(`Height: ${height} cm`);
    console.log(`Steps: ${steps}`);
    console.log(`Bedtime: ${bedtime}`);
    console.log(`Wake-up: ${wakeUp}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Edit Profile</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
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

          <Button title="Save" onPress={saveProfileData} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8d7da',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default ProfileScreen;
