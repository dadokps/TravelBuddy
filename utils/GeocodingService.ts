import axios from 'axios';
import * as Location from 'expo-location';

type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

type LocationResult = {
  id: string;
  name: string;
  address: string;
  country?: string;
  coordinates: GeoCoordinates;
};

// Configuration - store these in environment variables
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_TOKEN';

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  try {
    // Try Google Places API first (most accurate)
    const googleResults = await googlePlacesSearch(query);
    if (googleResults.length > 0) return googleResults;
    
    // Fallback to Mapbox
    const mapboxResults = await mapboxSearch(query);
    if (mapboxResults.length > 0) return mapboxResults;
    
    // Final fallback to OpenStreetMap
    return await openStreetMapSearch(query);
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

// Google Places API implementation
const googlePlacesSearch = async (query: string): Promise<LocationResult[]> => {
  const response = await axios.get<{
    predictions?: { place_id: string; structured_formatting: { main_text: string }; description: string }[];
  }>(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
  );

  if (!response.data.predictions) return [];

  // We need to get details for each prediction to get coordinates
  const detailedResults = await Promise.all(
    response.data.predictions.slice(0, 5).map(async (prediction: any) => {
      const details = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${GOOGLE_API_KEY}`
      );
      return {
        id: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        address: prediction.description,
        coordinates: {
          latitude: (details.data as { result: { geometry: { location: { lat: number } } } }).result.geometry.location.lat,
          longitude: (details.data as { result: { geometry: { location: { lng: number } } } }).result.geometry.location.lng
        }
      };
    })
  );

  return detailedResults.filter(Boolean);
};

// Mapbox Geocoding implementation
const mapboxSearch = async (query: string): Promise<LocationResult[]> => {
  const response = await axios.get<{ features: { id: string; text: string; place_name: string; center: [number, number] }[] }>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  return response.data.features.map((feature: any) => ({
    id: feature.id,
    name: feature.text,
    address: feature.place_name,
    coordinates: {
      latitude: feature.center[1],
      longitude: feature.center[0]
    }
  }));
};

// OpenStreetMap Nominatim implementation
const openStreetMapSearch = async (query: string): Promise<LocationResult[]> => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );

  return (response.data as { lat: string; lon: string; display_name: string }[]).map((item: any, index: number) => ({
    id: `osm-${index}`,
    name: item.display_name.split(',')[0],
    address: item.display_name,
    coordinates: {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon)
    }
  }));
};

// Reverse geocoding for current location
export const reverseGeocode = async (coords: GeoCoordinates): Promise<LocationResult> => {
  try {
    // Try Google first
    const googleResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_API_KEY}`
    );
    
    const googleData = googleResponse.data as { results: { address_components: any[]; formatted_address: string }[] };
    if (googleData.results.length > 0) {
      const result = (googleResponse.data as { results: { address_components: any[]; formatted_address: string }[] }).results[0];
      return {
        id: 'current',
        name: result.address_components[0]?.long_name || 'Current Location',
        address: result.formatted_address,
        coordinates: coords
      };
    }
  } catch (error) {
    console.log('Google reverse geocode failed, falling back to OSM');
  }

  // Fallback to OSM
  const osmResponse = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
  );

  return {
    id: 'current',
    name: (osmResponse.data as { address?: { road?: string }; display_name: string }).address?.road || 'Current Location',
    address: (osmResponse.data as { display_name: string }).display_name,
    coordinates: coords
  };
};