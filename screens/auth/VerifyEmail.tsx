import React from 'react';
import { 
  Box, 
  Text, 
  Button, 
  VStack, 
  Heading, 
  Center, 
  useTheme 
} from 'native-base';
import { StackNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

export const VerifyEmailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<'VerifyEmail'>>();
  const { colors } = useTheme();

  return (
    <Center flex={1} px="4" bg="white">
      <VStack space={4} alignItems="center" w="100%">
        <Heading size="xl" color="primary.500" mb="2">
          Verify Your Email
        </Heading>
        
        <Box bg="primary.50" p="4" rounded="lg" w="100%">
          <Text textAlign="center" color="gray.600">
            We've sent a verification link to your email address. Please check your inbox and follow the instructions.
          </Text>
        </Box>

        <Button
          mt="6"
          size="lg"
          w="100%"
          variant="outline"
          colorScheme="primary"
          onPress={() => navigation.navigate('Login')}
        >
          Back to Login
        </Button>
      </VStack>
    </Center>
  );
};