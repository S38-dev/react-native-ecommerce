import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
// import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

    const handleChange = (text) => {
      setQuery(text);
      onSearch(text); 
    };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={query}
        onChangeText={handleChange}
        clearButtonMode="while-editing"
        textAlignVertical="center"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginRight: 10,
    marginBottom: 0,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    minWidth:320,
    


  },
  input: {
    height: 40,
    fontSize: 16,
    textAlignVertical: 'center',
  },
});

export default SearchBar;
