import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../api/supabase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';

type CreateNewPasswordRouteParams = {
  CreateNewPassword: {
    email: string;
    token: string;
  };
};

type CreateNewPasswordProps = {
  route: RouteProp<CreateNewPasswordRouteParams, 'CreateNewPassword'>;
};

export const CreateNewPasswordScreen = ({ route }: CreateNewPasswordProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation<StackNavigationProp<'CreateNewPassword'>>();
  const { email, token } = route.params;

  const handleSubmit = async () => {
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First verify the token is still valid
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery',
      });

      if (verifyError) throw verifyError;

      // If token is valid, update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      // Password updated successfully
      navigation.navigate('PasswordSuccess');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to update password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subtitle}>For {email}</Text>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      
      <Button
        title="Update Password"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={!password || !confirmPassword}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#666',
  },
  error: {
    color: '#ff5252',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
  },
});