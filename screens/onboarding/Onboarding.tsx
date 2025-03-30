import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Image, Text, Button, HStack, Center, VStack, useTheme } from 'native-base';
import { StackNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    id: '1',
    title: 'Find Travel Buddies',
    description: 'Connect with people going to the same destination as you',
    image: require('../../assets/images/onboarding1.jpg'),
  },
  {
    id: '2',
    title: 'Share Rides & Costs',
    description: 'Split travel expenses and make your journey more affordable',
    image: require('../../assets/images/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Safe & Verified',
    description: 'All users are verified to ensure a safe travel experience',
    image: require('../../assets/images/onboarding3.jpeg'),
  },
];

export const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<'Onboarding'>>();
  const { colors } = useTheme();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Auth');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Auth');
  };

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Skip button */}
      <Button 
        variant="ghost" 
        position="absolute" 
        top={6} 
        right={4} 
        zIndex={1}
        onPress={handleSkip}
        _text={{ color: 'primary.500', fontWeight: 'medium' }}
      >
        Skip
      </Button>

      {/* Scrollable slides */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
      >
        {slides.map((slide) => (
          <Box key={slide.id} width="100%" flex={1} alignItems="center" justifyContent="center" p={8}>
            <Image 
              source={slide.image} 
              alt={slide.title}
              size={300}
              resizeMode="contain"
              mb={12}
            />
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
              {slide.title}
            </Text>
            <Text fontSize="md" color="gray.600" textAlign="center" px={8}>
              {slide.description}
            </Text>
          </Box>
        ))}
      </ScrollView>

      {/* Pagination indicators */}
      <Center mb={12}>
        <HStack space={2}>
          {slides.map((_, index) => (
            <Box 
              key={index}
              width={currentIndex === index ? 4 : 2}
              height={2}
              borderRadius="full"
              bg={currentIndex === index ? 'primary.500' : 'gray.300'}
            />
          ))}
        </HStack>
      </Center>

      {/* Next/Get Started button */}
      <Box px={6} mb={10}>
        <Button
          colorScheme="primary"
          borderRadius="lg"
          py={3}
          onPress={handleNext}
          _text={{ fontWeight: 'bold', fontSize: 'md' }}
        >
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};