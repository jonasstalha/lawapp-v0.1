import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

import { Star, MapPin, Calendar } from 'lucide-react-native';

const LAWYERS = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    specialization: 'Business Law',
    experience: '15 years',
    rating: 4.9,
    reviews: 127,
    location: 'Casablanca',
    languages: ['Arabic', 'French', 'English'],
  },
  {
    id: '2',
    name: 'Mohammed Hassan',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800',
    specialization: 'Criminal Law',
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    location: 'Rabat',
    languages: ['Arabic', 'French'],
  },
  {
    id: '3',
    name: 'Fatima Zahra',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    specialization: 'Family Law',
    experience: '8 years',
    rating: 4.7,
    reviews: 73,
    location: 'Marrakech',
    languages: ['Arabic', 'French', 'Spanish'],
  },
];

const SPECIALIZATIONS = [
  'Business Law',
  'Criminal Law',
  'Family Law',
  'Real Estate',
  'Labor Law',
];

export default function LawyersScreen() {
  const { t } = useTranslation();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    

      <Text style={styles.sectionTitle}>{t('lawyers.specializations')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specializationsContainer}>
        {SPECIALIZATIONS.map((specialization) => (
          <Pressable
            key={specialization}
            style={[
              styles.specializationChip,
              selectedSpecialization === specialization && styles.specializationChipSelected,
            ]}
            onPress={() => setSelectedSpecialization(
              selectedSpecialization === specialization ? null : specialization
            )}>
            <Text
              style={[
                styles.specializationText,
                selectedSpecialization === specialization && styles.specializationTextSelected,
              ]}>
              {specialization}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.lawyersContainer}>
        {LAWYERS.map((lawyer) => (
          <Pressable key={lawyer.id} style={styles.lawyerCard}>
            <Image source={{ uri: lawyer.image }} style={styles.lawyerImage} />
            <View style={styles.lawyerInfo}>
              <Text style={styles.lawyerName}>{lawyer.name}</Text>
              <Text style={styles.specialization}>{lawyer.specialization}</Text>
              
              <View style={styles.ratingContainer}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.rating}>
                  {lawyer.rating} ({lawyer.reviews} reviews)
                </Text>
              </View>

              <View style={styles.locationContainer}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.location}>{lawyer.location}</Text>
              </View>

              <View style={styles.languagesContainer}>
                {lawyer.languages.map((language, index) => (
                  <View key={language} style={styles.languageChip}>
                    <Text style={styles.languageText}>{language}</Text>
                  </View>
                ))}
              </View>

              <Pressable style={styles.bookButton}>
                <Calendar size={16} color="#ffffff" style={styles.bookIcon} />
                <Text style={styles.bookButtonText}>{t('lawyers.book')}</Text>
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
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  specializationsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  specializationChip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  specializationChipSelected: {
    backgroundColor: '#2563eb',
  },
  specializationText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#1e293b',
  },
  specializationTextSelected: {
    color: '#ffffff',
  },
  lawyersContainer: {
    padding: 16,
  },
  lawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lawyerImage: {
    width: '100%',
    height: 200,
  },
  lawyerInfo: {
    padding: 16,
  },
  lawyerName: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#1e293b',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
    marginLeft: 4,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  languageChip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookIcon: {
    marginRight: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#ffffff',
  },
});