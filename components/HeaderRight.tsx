import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { Sun, Moon, Languages } from 'lucide-react-native';

export function HeaderRight() {
  const { setLanguage, getCurrentLanguage } = useTranslation();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Theme implementation will be added later
  };

  const cycleLanguage = () => {
    const languages = ['ar', 'fr', 'en'];
    const currentLang = getCurrentLanguage();
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={cycleLanguage}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}>
        <Languages size={20} color="#1e293b" />
      </Pressable>
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}>
        {isDark ? (
          <Moon size={20} color="#1e293b" />
        ) : (
          <Sun size={20} color="#1e293b" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#e2e8f0',
    transform: [{ scale: 0.95 }],
  },
});