import React from 'react';
import { TouchableOpacity,Image ,SafeAreaView, View, Text, Button, StyleSheet, Modal } from 'react-native';
import { IStackScreenProps } from '../../src/library/StackScreenProps';

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text>Home</Text>

        <Modal 
        transparent = {true} 
        visible = {true}
        >

         <View style = {styles.popupmain}>
          <View>
          <Text style = {styles.headline}> testing</Text>
          </View>
         </View>


        </Modal>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  popupmain: {
    borderRadius:20,
    width: '50%',
    height: '50%',
    top: '25%',
    left: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#001e00",
  },

  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  topBar: {
    height: 50,
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