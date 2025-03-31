import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchScreen } from './SearchScreen';
import { PublishScreen } from './PublishScreen';
import { TripsScreen } from './TripsScreen';
import { ProfileScreen } from './ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Publish') iconName = 'add-circle';
          else if (route.name === 'Trips') iconName = 'list';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Profile') iconName = 'person';

          return <Icon as={MaterialIcons} name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'primary.600',
        tabBarInactiveTintColor: 'gray.500',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Publish" component={PublishScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};