import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HarvestScreen = ({ cropName, onHarvest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harvest Page</Text>
      <Text style={styles.cropName}>Crop: {cropName}</Text>
      <TouchableOpacity style={styles.harvestButton} onPress={onHarvest}>
        <Text style={styles.harvestButtonText}>Harvest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cropName: {
    fontSize: 18,
    marginBottom: 20,
  },
  harvestButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  harvestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HarvestScreen = ({ cropName, onHarvest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harvest Page</Text>
      <Text style={styles.cropName}>Crop: {cropName}</Text>
      <TouchableOpacity style={styles.harvestButton} onPress={onHarvest}>
        <Text style={styles.harvestButtonText}>Harvest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cropName: {
    fontSize: 18,
    marginBottom: 20,
  },
  harvestButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  harvestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HarvestScreen_final;