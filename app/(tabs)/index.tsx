import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

import { CategoryCard } from '@/components/CategoryCard';
import { Scale, Gavel, Users, Building2, FileText } from 'lucide-react-native';

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'New Labor Law Changes in 2025',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    category: 'Labor Law',
  },
  {
    id: '2',
    title: 'Understanding Business Registration',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: 'Business Law',
  },
];

const FEATURED_LAWYERS = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    specialization: 'Business Law',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Mohammed Hassan',
    specialization: 'Criminal Law',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800',
    rating: 4.8,
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}>
        <CategoryCard icon={Scale} title="Business Law" onPress={() => {}} />
        <CategoryCard icon={Gavel} title="Criminal Law" onPress={() => {}} />
        <CategoryCard icon={Users} title="Family Law" onPress={() => {}} />
        <CategoryCard icon={FileText} title="Civil Law" onPress={() => {}} />
        <CategoryCard icon={Building2} title="Real Estate" onPress={() => {}} />
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.latestNews')}</Text>
          <Pressable>
            <Text style={styles.viewAll}>{t('home.viewAll')}</Text>
          </Pressable>
        </View>
        {NEWS_ITEMS.map((item) => (
          <Pressable key={item.id} style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsCategory}>{item.category}</Text>
              <Text style={styles.newsTitle}>{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.featuredLawyers')}</Text>
          <Pressable>
            <Text style={styles.viewAll}>{t('home.viewAll')}</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lawyersContainer}>
          {FEATURED_LAWYERS.map((lawyer) => (
            <Pressable key={lawyer.id} style={styles.lawyerCard}>
              <Image source={{ uri: lawyer.image }} style={styles.lawyerImage} />
              <Text style={styles.lawyerName}>{lawyer.name}</Text>
              <Text style={styles.lawyerSpecialization}>
                {lawyer.specialization}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐️ {lawyer.rating}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#2563eb',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 16,
  },
  newsCategory: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
  },
  lawyersContainer: {
    paddingRight: 16,
  },
  lawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  lawyerName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  lawyerSpecialization: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#1e293b',
  },
});