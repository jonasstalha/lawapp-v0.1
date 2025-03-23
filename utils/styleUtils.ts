import { Platform } from 'react-native';

export const getCardStyle = (isDark: boolean) => ({
  backgroundColor: isDark ? '#0f172a' : '#ffffff',
  ...Platform.select({
    ios: {
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.3 : 0.05,
      shadowRadius: 3.84,
    },
    android: {
      elevation: isDark ? 0 : 5,
    },
  }),
}); 