import React, { useState } from 'react';
import { 
  Box,
  Text,
  VStack,
  Heading,
  useToast,
  Center,
  Link,
  Button
} from 'native-base';
import { TextInput } from '../../components/ui/TextInput';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  const navigation = useNavigation<StackNavigationProp<'ForgotPassword'>>();
  const toast = useToast();

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await resetPassword(email);
      toast.show({
        description: "Reset link sent to your email",
        placement: 'top',
        bg: 'success.500'
      });
      navigation.navigate('ForgotPasswordOTP', { email });
    } catch (err) {
      toast.show({
        description: err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred',
        placement: 'top',
        bg: 'error.500'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center flex={1} px={6} bg="white">
      <Box w="100%" maxW="400px">
        <VStack space={4}>
          <Heading size="xl" textAlign="center" color="primary.600">
            Reset Password
          </Heading>
          
          <Text textAlign="center" color="gray.500" mb={6}>
            Enter your email to receive a password reset link
          </Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Button
            colorScheme="primary"
            size="lg"
            borderRadius="lg"
            mt={4}
            py={3}
            isLoading={isLoading}
            onPress={handleResetPassword}
            _text={{ fontWeight: 'bold' }}
            disabled={!email}
          >
            Send Reset Link
          </Button>

          <Link 
            onPress={() => navigation.navigate('Login')} 
            _text={{ color: 'primary.500', textAlign: 'center', mt: 4 }}
          >
            Back to Login
          </Link>
        </VStack>
      </Box>
    </Center>
  );
};