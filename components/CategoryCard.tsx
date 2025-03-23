import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  onPress: () => void;
}

export function CategoryCard({ icon: Icon, title, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.container,
      pressed && styles.pressed
    ]}>
      <View style={styles.iconContainer}>
        <Icon size={24} color="#2563eb" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 120,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
  },
});