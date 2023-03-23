import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';

import { IStackScreenProps } from '../../src/library/StackScreenProps';

const PlantsScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Plants</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search plants"
          />
        </View>
        <View style={styles.subtypesContainer}>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Fruit</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Nut</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Flower</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Nightshade</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Herb</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Berry</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Legume</Text>
          </View>
          <View style={styles.subtype}>
            <Text style={styles.subtypeText}>Cruciferous</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013220',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  topBar: {
    backgroundColor: '#4CAF50',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  subtypesContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  subtype: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 250,
    alignItems: 'flex-start',
  },
  subtypeText: {
    fontSize: 20,

  },
});

export default PlantsScreen;
