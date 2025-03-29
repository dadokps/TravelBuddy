import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/Login';
import { SignUpScreen } from '../screens/auth/SignUp';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPassword';
import { ForgotPasswordOTPScreen } from '../screens/auth/ForgotPasswordOTP';
import { CreateNewPasswordScreen } from '../screens/auth/CreateNewPassword';
import { PasswordSuccessScreen } from '../screens/auth/PasswordSuccess';
import { AuthStackParamList } from './types';
import { VerifyEmailScreen } from '../screens/auth/VerifyEmail'; // Add this import

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right' 
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTPScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} /> 
    </Stack.Navigator>
  );
};