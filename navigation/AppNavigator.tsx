import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/onboarding/Onboarding';
import { AuthNavigator } from './AuthNavigator';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/main/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { session } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};