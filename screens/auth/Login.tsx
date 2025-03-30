import React, { useState } from 'react';
import { Box, Text, Button, Input, VStack, Link, useToast } from 'native-base';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigation = useNavigation<StackNavigationProp<'Login'>>();
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      toast.show({
        description: message,
        variant: 'solid',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} px={6} justifyContent="center" bg="white">
      <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        Welcome Back
      </Text>
      
      <VStack space={4}>
        {error && (
          <Box bg="red.100" p={3} borderRadius="md">
            <Text color="red.600" textAlign="center">{error}</Text>
          </Box>
        )}
        
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          size="lg"
          borderRadius="lg"
          bg="gray.100"
          borderWidth={0}
          _focus={{ bg: 'gray.200' }}
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          size="lg"
          borderRadius="lg"
          bg="gray.100"
          borderWidth={0}
          _focus={{ bg: 'gray.200' }}
        />
        
        <Button
          colorScheme="primary"
          size="lg"
          borderRadius="lg"
          mt={4}
          py={3}
          isLoading={isLoading}
          onPress={handleLogin}
          _text={{ fontWeight: 'bold' }}
        >
          Login
        </Button>
        
        <Link
          mt={4}
          alignSelf="center"
          onPress={() => navigation.navigate('ForgotPassword')}
          _text={{ color: 'primary.600', fontWeight: 'medium' }}
        >
          Forgot Password?
        </Link>
        
        <VStack mt={8} justifyContent="center" space={1}>
          <Text color="gray.600">Don't have an account?</Text>
          <Link
            onPress={() => navigation.navigate('SignUp')}
            _text={{ color: 'primary.600', fontWeight: 'medium' }}
          >
            Sign Up
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
};