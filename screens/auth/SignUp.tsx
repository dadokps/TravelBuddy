import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { 
  Box,
  Text,
  VStack,
  Heading,
  Divider,
  Avatar,
  useToast,
  Button
} from 'native-base';
import { TextInput } from '../../components/ui/TextInput';
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
  const navigation = useNavigation<StackNavigationProp<'SignUp'>>();
  const toast = useToast();

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
      toast.show({
        description: "Passwords don't match",
        placement: 'top',
        bg: 'error.500'
      });
      return;
    }

    setIsLoading(true);
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
      setError(err instanceof Error ? err.message : 'Signup failed 3');
      toast.show({
        description: err instanceof Error ? err.message : 'Signup failed',
        placement: 'top',
        bg: 'error.500'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box flex={1} p={5} bg="white">
        <VStack space={4}>
          <Heading size="xl" textAlign="center" mb={4} color="primary.600">
            Create Account
          </Heading>
          
          {error && (
            <Text color="red.500" textAlign="center" mb={3}>
              {error}
            </Text>
          )}

          <Box alignItems="center" mb={4}>
            {avatarUri ? (
              <Avatar size="xl" source={{ uri: avatarUri }} mb={2} />
            ) : (
              <ImageUpload 
                onImageSelected={setAvatarUri} 
                initialUri={avatarUri ?? undefined}
              />
            )}
          </Box>

          <Divider my={2} />

          <Text fontSize="md" fontWeight="medium" color="gray.700">
            Account Information
          </Text>
          
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

          <Divider my={2} />

          <Text fontSize="md" fontWeight="medium" color="gray.700">
            Profile Information
          </Text>
          
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

          <Box mt={4}>
            <Button
                colorScheme="primary"
                size="lg"
                borderRadius="lg"
                mt={4}
                py={3}
                isLoading={isLoading}
                onPress={handleSignUp}
                _text={{ fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};