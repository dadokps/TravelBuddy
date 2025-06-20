import { RouteProp as NavigationRouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ForgotPasswordOTP: { email: string };
  CreateNewPassword: { email: string; token: string };
  PasswordSuccess: undefined;
  VerifyEmail: undefined;
};

export type AppStackParamList = RootStackParamList & AuthStackParamList;

export type StackNavigationProp<T extends keyof AppStackParamList> = 
  NativeStackNavigationProp<AppStackParamList, T>;

export type RouteProp<T extends keyof AppStackParamList> = 
  NavigationRouteProp<AppStackParamList, T>;

export type ScreenProps<T extends keyof AppStackParamList> = {
  navigation: StackNavigationProp<T>;
  route: RouteProp<T>;
};

type ImageUploadType = {
  uri: string;
  name: string;
  type: string;
};

// screens/main/types.ts
export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationResult = {
  id: string;
  name: string;
  address: string;
  country?: string;
  coordinates: GeoCoordinates;
  additionalDetails?: {
    city?: string;
    postalCode?: string;
    neighborhood?: string;
  };
};

export type TripCreationFlowState = 
  | 'initial' 
  | 'searching' 
  | 'confirming' 
  | 'date-selection' 
  | 'passenger-selection';

  