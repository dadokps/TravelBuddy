import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput }  from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';
import { useRoute } from '@react-navigation/native';

export const ForgotPasswordOTPScreen = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation<StackNavigationProp<'ForgotPasswordOTP'>>();
  type ForgotPasswordOTPRouteParams = {
    ForgotPasswordOTP: { email: string };
  };

  const route = useRoute<RouteProp<ForgotPasswordOTPRouteParams, 'ForgotPasswordOTP'>>();
  const { email } = route.params;

  const handleVerifyOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('CreateNewPassword', { email, token: otp });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent a code to {email}</Text>
      
      <TextInput
        placeholder="Enter 6-digit code"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />
      
      <Button
        title="Verify"
        onPress={handleVerifyOTP}
        loading={isLoading}
        disabled={otp.length < 6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
});