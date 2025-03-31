import React from 'react';
import { 
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Icon,
  Input,
  Divider,
  Pressable
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const SearchScreen = () => {
  return (
    <Box flex={1} bg="white" p={4}>
      {/* Header */}
      <Heading size="xl" mb={2} color="primary.600">
        Thousands of trips at great prices
      </Heading>
      
      {/* Search Form */}
      <VStack space={4} mb={6}>
        <HStack space={2}>
          <Input 
            flex={1}
            placeholder="From (e.g. Seville)"
            InputLeftElement={<Icon as={<MaterialIcons name="location-on" />} ml={2} color="muted.400" />}
          />
          <Input 
            flex={1}
            placeholder="To (e.g. Madrid)"
            InputLeftElement={<Icon as={<MaterialIcons name="location-on" />} ml={2} color="muted.400" />}
          />
        </HStack>
        
        <Input
          placeholder="Date (e.g. Tue Apr 04)"
          InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />} ml={2} color="muted.400" />}
        />
        
        <Button colorScheme="primary" size="lg">
          Search
        </Button>
      </VStack>
      
      {/* Recent Searches */}
      <VStack space={3} mb={6}>
        <Text fontSize="md" fontWeight="medium">Recent searches</Text>
        
        <Pressable p={3} bg="gray.50" borderRadius="md">
          <VStack space={1}>
            <Text fontWeight="medium">Seville → Madrid</Text>
            <Text fontSize="sm" color="gray.500">1 passenger</Text>
          </VStack>
        </Pressable>
        
        <Pressable p={3} bg="gray.50" borderRadius="md">
          <VStack space={1}>
            <Text fontWeight="medium">Barcelona Airport (BCN) → Avenida de América, Madrid</Text>
            <Text fontSize="sm" color="gray.500">1 passenger</Text>
          </VStack>
        </Pressable>
      </VStack>
    </Box>
  );
};