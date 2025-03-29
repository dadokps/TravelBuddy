import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native'; // Import NavigationProp

// Define the type for the navigation prop
type WelcomeScreenProps = {
  navigation: NavigationProp<any>; // Use NavigationProp to define the type
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <ImageBackground
      source={require('../assets/images/welcome-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Travel Buddy</Text>
        <Text style={styles.subtitle}>Explore the world with like-minded travelers</Text>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => navigation.navigate('Home')} // Navigate to Home screen
        >
          Sign In / Login
        </Button>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => console.log('Sign in with Google')}
        >
          <Ionicons name="logo-google" size={24} color="#fff" />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '80%',
    marginBottom: 16,
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4437',
    padding: 12,
    borderRadius: 4,
    width: '80%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default WelcomeScreen;