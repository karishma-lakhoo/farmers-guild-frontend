import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const InviteScreen = () => {
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    // Logic to send the invite email
    console.log(`Sending invite to ${email}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Send Invite" onPress={handleInvite} />
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
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default InviteScreen_final;