import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchScreen } from './SearchScreen';
import { MyTripsScreen } from './MyTripsScreen';
import { ProfileScreen } from './ProfileScreen';
import { CreateTripScreen } from './CreateTripScreen';


const Tab = createBottomTabNavigator();

export const MainLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Create_Trip') iconName = 'add-circle';
          else if (route.name === 'Trips') iconName = 'list';
          else if (route.name === 'Profile') iconName = 'person';

          return <Icon as={MaterialIcons} name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'primary.600',
        tabBarInactiveTintColor: 'gray.500',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create_Trip" component={CreateTripScreen} />
      <Tab.Screen name="Trips" component={MyTripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};