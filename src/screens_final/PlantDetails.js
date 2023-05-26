import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlantDetailScreen = ({ plant }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.description}>{plant.description}</Text>
      <Text style={styles.label}>Care Level:</Text>
      <Text>{plant.careLevel}</Text>
      <Text style={styles.label}>Light:</Text>
      <Text>{plant.light}</Text>
      <Text style={styles.label}>Watering:</Text>
      <Text>{plant.watering}</Text>
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
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlantDetailScreen = ({ plant }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.description}>{plant.description}</Text>
      <Text style={styles.label}>Care Level:</Text>
      <Text>{plant.careLevel}</Text>
      <Text style={styles.label}>Light:</Text>
      <Text>{plant.light}</Text>
      <Text style={styles.label}>Watering:</Text>
      <Text>{plant.watering}</Text>
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
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default PlantDetailScreen_final;