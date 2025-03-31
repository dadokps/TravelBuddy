import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Box, Text, Button } from 'native-base';

interface Location {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface LocationConfirmationScreenProps {
  location: Location;
  onConfirm: () => void;
  onBack: () => void;
}

export const LocationConfirmationScreen: React.FC<LocationConfirmationScreenProps> = ({ location, onConfirm, onBack }) => {
  return (
    <Box flex={1}>
      <Text fontSize="xl" p={4}>{location.name}</Text>
      <Text px={4}>{location.address}</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      
      <Button onPress={onConfirm} m={4}>
        Confirm Location
      </Button>
      <Button variant="ghost" onPress={onBack}>
        Back
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    height: '100%'
  }
});