import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'MorocLaw',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Cairo-Bold',
          },
        }} 
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome to MorocLaw</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    textAlign: 'center',
  },
}); 