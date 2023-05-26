import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HarvestWeight = () => {
  let weight = '';

  const handleWeightChange = (text) => {
    weight = text;
  };

  const handleSubmit = () => {
    // Perform any actions with the entered weight
    console.log('Submitted weight:', weight);
    // Reset the weight input
    weight = '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harvest Weight</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        onChangeText={handleWeightChange}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default HarvestWeight_final;