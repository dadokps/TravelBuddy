import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

type ImageUploadProps = {
  onImageSelected: (uri: string) => void;
  initialUri?: string;
};

export const ImageUpload = ({ onImageSelected, initialUri }: ImageUploadProps) => {
  const [imageUri, setImageUri] = useState<string | null>(initialUri || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets) {
        // Compress and resize
        const processedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500 } }],
          { format: SaveFormat.JPEG, compress: 0.7 }
        );
        setImageUri(processedImage.uri);
        onImageSelected(processedImage.uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} disabled={loading}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="add-a-photo" size={40} color="#666" />
          </View>
        )}
      </TouchableOpacity>
      {loading && <ActivityIndicator style={styles.loader} size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  loader: {
    position: 'absolute',
  },
});