import React from 'react';
import { TouchableOpacity,Image ,SafeAreaView, View, Text, Button, StyleSheet, Modal } from 'react-native';
import { IStackScreenProps } from '../../src/library/StackScreenProps';

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text>Home</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  topBar: {
    height: 50,
    backgroundColor: '#013220',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#013220',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default HomeScreen;