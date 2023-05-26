import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PlantPage = () => {
  const plants = [
    { id: 1, name: 'Rose' },
    { id: 2, name: 'Lily' },
    { id: 3, name: 'Tulip' },
    { id: 4, name: 'Sunflower' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plants</Text>
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PlantPage_final;