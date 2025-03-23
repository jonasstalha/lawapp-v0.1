import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';

import {
  Building2,
  Scale,
  Shield,
  MapPin,
  Clock,
  Phone,
  ExternalLink,
} from 'lucide-react-native';

const OFFICES = [
  {
    id: '1',
    name: 'Commercial Court of Casablanca',
    type: 'Court',
    address: '2 Rue Al Morjane, Casablanca 20100',
    hours: '8:30 AM - 4:30 PM',
    phone: '+212 522-000000',
    distance: '2.5 km',
  },
  {
    id: '2',
    name: 'Notary Office - Me. Hassan',
    type: 'Notary',
    address: '45 Avenue Hassan II, Rabat',
    hours: '9:00 AM - 5:00 PM',
    phone: '+212 537-000000',
    distance: '3.1 km',
  },
  {
    id: '3',
    name: 'Central Police Station',
    type: 'Police',
    address: '12 Rue Mohammed V, Marrakech',
    hours: '24/7',
    phone: '+212 524-000000',
    distance: '1.8 km',
  },
];

const CATEGORIES = [
  { id: 'courts', icon: Scale, title: 'Courts' },
  { id: 'notaries', icon: Building2, title: 'Notaries' },
  { id: 'police', icon: Shield, title: 'Police' },
];

export default function OfficesScreen() {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Pressable 
              key={category.id} 
              style={[
                styles.categoryCard,
                getCardStyle(isDark)
              ]}
            >
              <View style={[
                styles.categoryIcon, 
                { backgroundColor: isDark ? colors.border : colors.input }
              ]}>
                <Icon size={24} color={colors.primary} />
              </View>
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {t(`offices.categories.${category.id}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.nearMeContainer}>
        <Text style={styles.nearMeTitle}>{t('offices.nearMe')}</Text>
        <MapPin size={20} color="#2563eb" />
      </View>

      <View style={styles.officesContainer}>
        {OFFICES.map((office) => (
          <Pressable 
            key={office.id} 
            style={[
              styles.officeCard,
              getCardStyle(isDark)
            ]}
          >
            <View style={styles.officeHeader}>
              <View style={styles.officeTypeContainer}>
                <Text style={styles.officeType}>{office.type}</Text>
              </View>
              <Text style={styles.distance}>{office.distance}</Text>
            </View>

            <Text style={styles.officeName}>{office.name}</Text>

            <View style={styles.infoRow}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.infoText}>{office.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.infoText}>{office.hours}</Text>
            </View>

            <View style={styles.infoRow}>
              <Phone size={16} color="#64748b" />
              <Text style={styles.infoText}>{office.phone}</Text>
            </View>

            <View style={styles.actionButtons}>
              <Pressable style={[styles.actionButton, styles.primaryButton]}>
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.primaryButtonText}>Get Directions</Text>
              </Pressable>

              <Pressable style={[styles.actionButton, styles.secondaryButton]}>
                <ExternalLink size={16} color="#2563eb" />
                <Text style={styles.secondaryButtonText}>Website</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryIcon: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  nearMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  nearMeTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  officesContainer: {
    padding: 16,
  },
  officeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  officeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  officeTypeContainer: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  officeType: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: '#2563eb',
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
  },
  officeName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#ffffff',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#2563eb',
  },
});