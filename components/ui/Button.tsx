import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>; // Add this line
};

export const Button = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  style // Add this
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: disabled ? '#cccccc' : '#6200ee',
          borderRadius: 8,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style, // Apply the style prop here
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};