import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/types';
import { supabase } from '../../api/supabase';
import { ImageUpload } from '../../components/ui/ImageUpload';

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<'SignUp'>>();

  const uploadAvatar = async () => {
    if (!avatarUri) return null;

    const fileExt = avatarUri.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const fileType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, {
        uri: avatarUri,
        name: fileName,
        type: fileType,
      } as any);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload avatar first if exists
      let avatarUrl = null;
      if (avatarUri) {
        //avatarUrl = await uploadAvatar();
      }

      //if (!avatarUrl) throw new Error('Avatar upload failed');
      //throw new Error(avatarUrl);

      // Create user with metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            firstname: firstName,
            lastname: lastName,
            age: age ? parseInt(age) : null,
            bio: bio
            //avatar_url: avatarUrl,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('Signup failed 2');
      navigation.navigate('VerifyEmail');

    } catch (err) {
      //console.error(err);
      setError(err instanceof Error ? err.message : 'Signup failed 3');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.sectionTitle}>Account Information</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.sectionTitle}>Profile Information</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <ImageUpload 
        onImageSelected={setAvatarUri} 
        initialUri={avatarUri ?? undefined}
      />

      {/* Add other form fields similarly */}
      
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});