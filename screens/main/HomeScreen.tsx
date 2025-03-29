import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

// Define the type for a search result
type SearchResult = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  groupName: string;
};

const HomeScreen = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Define the type
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!destination.trim()) {
      setError('Please enter a destination.');
      return;
    }

    if (startDate > endDate) {
      setError('End date cannot be before start date.');
      return;
    }

    // Simulate fetching search results (replace with actual API call)
    const mockResults: SearchResult[] = [
      {
        id: '1',
        destination: 'Paris',
        startDate: '2025-03-15',
        endDate: '2025-03-20',
        groupName: 'Adventure Seekers',
      },
      {
        id: '2',
        destination: 'Paris',
        startDate: '2025-03-18',
        endDate: '2025-03-22',
        groupName: 'Food Lovers',
      },
    ];

    setSearchResults(mockResults);
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Travel Buddies</Text>
      <TextInput
        label="Destination"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
        mode="outlined"
      />
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Ionicons name="calendar" size={24} color="#6200ee" />
        <Text style={styles.dateText}>
          Start Date: {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Ionicons name="calendar" size={24} color="#6200ee" />
        <Text style={styles.dateText}>
          End Date: {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSearch}
      >
        Search
      </Button>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultDestination}>{item.destination}</Text>
            <Text style={styles.resultDates}>
              {item.startDate} to {item.endDate}
            </Text>
            <Text style={styles.resultGroup}>{item.groupName}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No results found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#6200ee',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  resultDestination: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultDates: {
    fontSize: 14,
    color: '#666',
  },
  resultGroup: {
    fontSize: 14,
    color: '#6200ee',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;