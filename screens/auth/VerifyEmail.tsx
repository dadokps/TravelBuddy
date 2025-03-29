import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

export const VerifyEmailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<'VerifyEmail'>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.message}>
        We've sent a verification link to your email address. Please check your inbox and follow the instructions.
      </Text>
      <Button 
        title="Back to Login" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
});