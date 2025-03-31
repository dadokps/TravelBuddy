import { useState } from 'react';
import { View } from 'react-native';
import { Button, Heading } from 'native-base';
import { LocationSearchScreen } from './LocationSearchScreen';
import { LocationConfirmationScreen } from './LocationConfirmationScreen';
import { LocationResult } from '../../navigation/types'; // Assuming you have a types file

export const CreateTripScreen = () => {
  const [flowState, setFlowState] = useState<'initial' | 'searching' | 'confirming'>('initial');
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);

  const handleStartTripCreation = () => {
    setFlowState('searching');
  };

  return (
    <View>
      {flowState === 'initial' && (
        <>
          <Heading>Create New Trip</Heading>
          <Button onPress={handleStartTripCreation}>
            Set Departure Location
          </Button>
        </>
      )}
      
      {flowState === 'searching' && (
        <LocationSearchScreen 
          onSelectLocation={setSelectedLocation}
          onBack={() => setFlowState('initial')}
        />
      )}
      
      {flowState === 'confirming' && selectedLocation && (
        <LocationConfirmationScreen 
          location={selectedLocation}
          onConfirm={() => {/* proceed to next step */}}
          onBack={() => setFlowState('searching')}
        />
      )}
    </View>
  );
};