import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
//import { colors } from '../../contants/theme';

export const TextInput = (props: TextInputProps) => {
  return (
    <RNTextInput
      style={styles.input}
      //placeholderTextColor={colors.gray}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    //borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
  },
});