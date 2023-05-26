import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const InvitePage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSendInvite = () => {
    // Implement logic to send the invite using the entered email
    console.log('Invitation sent to:', email);
    // Reset the email input
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <Button title="Send Invite" onPress={handleSendInvite} />
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

export default InvitePage;
