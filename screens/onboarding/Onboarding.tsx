import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from '../../components/ui/Button';
import { StackNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../../contants/theme';

// Define your onboarding slides data
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
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

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
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination indicators */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Next/Get Started button */}
      <View style={styles.buttonContainer}>
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  skipButton: {
    position: 'absolute',
    top: spacing.large,
    right: spacing.large,
    zIndex: 1,
  },
  skipText: {
    color: colors.primary,
    fontSize: 16,
  },
  slide: {
    width: '100%', // Will be adjusted by ScrollView
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: spacing.xlarge,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  description: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    paddingHorizontal: spacing.xlarge,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xlarge,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 16,
  },
  buttonContainer: {
    paddingHorizontal: spacing.large,
    marginBottom: spacing.xlarge,
  },
});