import React from 'react';
import { 
  TextInput, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  View,
  Text,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export function Input({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  multiline,
  label,
  error,
  secureTextEntry,
  keyboardType = 'default',
}: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            color: colors.text,
            borderColor: error ? colors.error : colors.border,
          },
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subText}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    borderWidth: 1,
  },
  error: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    marginTop: 4,
  },
}); 