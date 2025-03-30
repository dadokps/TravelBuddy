import React from 'react';
import { 
  Box,
  Text,
  VStack,
  Center,
  Heading,
  Button,
  useTheme
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';

export const PasswordSuccessScreen = () => {
  const navigation = useNavigation<StackNavigationProp<'PasswordSuccess'>>();
  const { colors } = useTheme();

  return (
    <Center flex={1} px={6} bg="white">
      <Box w="100%" maxW="400px">
        <VStack space={8} alignItems="center">
          <Box bg="primary.100" p={6} rounded="full">
            <Text fontSize="5xl" color="primary.600">🎉</Text>
          </Box>
          
          <VStack space={2} alignItems="center">
            <Heading size="xl" color="primary.600" textAlign="center">
              Password Changed!
            </Heading>
            <Text 
              fontSize="md" 
              color="gray.500" 
              textAlign="center"
              px={4}
            >
              Your password has been updated successfully
            </Text>
          </VStack>

          <Button
            w="100%"
            size="lg"
            colorScheme="primary"
            onPress={() => navigation.navigate('Login')}
            mt={8}
          >
            Back to Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};