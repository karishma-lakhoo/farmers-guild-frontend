import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Screen</Text>
      <Text style={styles.logText}>This is the log screen.</Text>
      <Text style={styles.logText}>You can display logs or any relevant information here.</Text>
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
  logText: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default LogScreen;