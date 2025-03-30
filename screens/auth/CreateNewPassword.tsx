import React, { useState } from 'react';
import { 
  Box,
  Text,
  VStack,
  Heading,
  useToast,
  Center,
  Link,
  Divider,
  Button
} from 'native-base';
import { TextInput } from '../../components/ui/TextInput';
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
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation<StackNavigationProp<'CreateNewPassword'>>();
  const { email, token } = route.params;
  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.show({
        description: "Passwords don't match",
        placement: 'top',
        bg: 'error.500'
      });
      return;
    }

    if (password.length < 8) {
      toast.show({
        description: "Password must be at least 8 characters",
        placement: 'top',
        bg: 'error.500'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery',
      });

      if (verifyError) throw verifyError;

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      navigation.navigate('PasswordSuccess');
    } catch (err) {
      toast.show({
        description: err instanceof Error 
          ? err.message 
          : 'Failed to update password. Please try again.',
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
            Create New Password
          </Heading>
          
          <Text textAlign="center" color="gray.500" mb={6}>
            For {email}
          </Text>

          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Button
              colorScheme="primary"
              size="lg"
              borderRadius="lg"
              mt={4}
              py={3}
              isLoading={isLoading}
              onPress={handleSubmit}
              _text={{ fontWeight: 'bold' }}
              disabled={!password || !confirmPassword}
            >
              Update Password
            </Button>

          <Divider my={4} />

          <Link 
            onPress={() => navigation.navigate('Login')} 
            _text={{ color: 'primary.500', textAlign: 'center' }}
          >
            Back to Login
          </Link>
        </VStack>
      </Box>
    </Center>
  );
};