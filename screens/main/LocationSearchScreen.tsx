import { useState, useEffect } from 'react';
import { Box, Input, FlatList, Text, Pressable } from 'native-base';
import * as Location from 'expo-location';
import { reverseGeocode, searchLocations } from '../../utils/GeocodingService';

type LocationResult = {
  id: string;
  name: string;
  address: string;
  country?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

type LocationSearchScreenProps = {
  onSelectLocation: (location: LocationResult) => void;
  onBack: () => void;
};

export const LocationSearchScreen = ({ onSelectLocation, onBack }: LocationSearchScreenProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationResult | null>(null);

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      let location = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync(location.coords);
      
      setCurrentLocation({
        id: 'current',
        name: 'My Current Location',
        address: `${place.street}, ${place.city}`,
        country: place.country ?? undefined,
        coordinates: location.coords
      });
    })();
  }, []);

  // Updated useEffect for search
  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(async () => {
        const results = await searchLocations(query);
        setResults(results);
      }, 500); // Debounce 500ms
      
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Updated current location handler
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      let location = await Location.getCurrentPositionAsync({});
      const place = await reverseGeocode(location.coords);
      
      setCurrentLocation({
        id: 'current',
        name: 'My Current Location',
        address: place.address,
        country: place.country,
        coordinates: location.coords
      });
    })();
  }, []);

  return (
    <Box p={4}>
      <Input
        placeholder="Enter full address"
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      
      <FlatList
        data={currentLocation ? [currentLocation, ...results] : results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable p={4} onPress={() => onSelectLocation(item)}>
            <Text fontWeight="bold">{item.name}</Text>
            <Text>{item.address}</Text>
            {item.country && <Text color="gray.500">{item.country}</Text>}
          </Pressable>
        )}
      />
    </Box>
  );
};