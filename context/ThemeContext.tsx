import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const COLORS = {
  light: {
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1e293b',
    subText: '#64748b',
    primary: '#2563eb',
    border: '#e2e8f0',
    input: '#f5f5f5',
    tabBar: '#FFFFFF',
    statusBar: 'dark',
  },
  dark: {
    background: '#1e293b',
    card: '#0f172a',
    text: '#f8fafc',
    subText: '#94a3b8',
    primary: '#60a5fa',
    border: '#334155',
    input: '#334155',
    tabBar: '#0f172a',
    statusBar: 'light',
  },
};

type ThemeMode = 'light' | 'dark';
type ThemeColors = typeof COLORS.light;

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colors: COLORS.light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemColorScheme as ThemeMode || 'light');

  // Load saved theme on startup
  useEffect(() => {
    loadTheme();
  }, []);

  // Save theme when it changes
  useEffect(() => {
    saveTheme(mode);
  }, [mode]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    try {
      await AsyncStorage.setItem('theme', newMode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      colors: COLORS[mode],
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 