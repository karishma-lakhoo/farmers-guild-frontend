import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfirmInviteScreen = ({ invitee }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Sent</Text>
      <Text style={styles.message}>An invite has been sent to:</Text>
      <Text style={styles.email}>{invitee}</Text>
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
  message: {
    fontSize: 18,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmInviteScreen;