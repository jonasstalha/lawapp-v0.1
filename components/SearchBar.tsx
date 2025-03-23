import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  onSearch: (text: string) => void;
}

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#64748b" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 4,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1e293b',
  },
});