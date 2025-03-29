import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';

export const PasswordSuccessScreen = () => {
  const navigation = useNavigation<StackNavigationProp<'PasswordSuccess'>>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🎉</Text>
        <Text style={styles.title}>Password Changed!</Text>
        <Text style={styles.subtitle}>Your password has been updated successfully</Text>
      </View>
      
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
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 30,
  },
});