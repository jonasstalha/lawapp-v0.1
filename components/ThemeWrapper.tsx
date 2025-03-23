import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { COLORS } from '@/theme/theme';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? COLORS.dark.background : COLORS.light.background }
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 