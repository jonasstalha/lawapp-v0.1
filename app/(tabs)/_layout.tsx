import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Chrome as Home, MessageSquareText, Scale, Building2 } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { HeaderRight } from '@/components/HeaderRight';
import { useTheme } from '@/context/ThemeContext';
import { ThemeWrapper } from '@/components/ThemeWrapper';

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ThemeWrapper>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subText,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerStyle: {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: 'Cairo-Bold',
            color: colors.text,
          },
          headerRight: () => <HeaderRight />,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.home'),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: t('tabs.chatbot'),
            tabBarIcon: ({ color, size }) => (
              <MessageSquareText size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lawyers"
          options={{
            title: t('tabs.lawyers'),
            tabBarIcon: ({ color, size }) => <Scale size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="offices"
          options={{
            title: t('tabs.offices'),
            tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
          }}
        />
      </Tabs>
    </ThemeWrapper>
  );
}