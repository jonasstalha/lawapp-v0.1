import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';

export function HeaderRight() {
  const { mode, colors, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <LanguageSelector />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={toggleTheme}
      >
        {mode === 'dark' ? (
          <Moon size={24} color={colors.text} />
        ) : (
          <Sun size={24} color={colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  button: {
    padding: 8,
  },
});