import { Tabs } from 'expo-router';
import { Chrome as Home, MessageSquareText, Scale, Building2 } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { HeaderRight } from '@/components/HeaderRight';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontFamily: 'Cairo-Bold',
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
  );
}