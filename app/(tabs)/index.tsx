import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable, LinearGradient } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { useRouter } from 'expo-router';
import { CategoryCard } from '@/components/CategoryCard';
import { Scale, Gavel, Users, Building2, FileText, ChevronRight, MessageCircle, Calendar, Star, Check, Globe, MapPin, Clock, CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

// Move this to a separate data file or API call
const BLOG_CATEGORIES = [
  'legal_updates', 'case_studies', 'legal_tips', 'court_decisions'
];

const NEWS_ITEMS = [
  {
    id: '1',
    titleKey: 'home.newsItems.laborLawChanges',
    descriptionKey: 'home.newsItems.laborLawChangesDesc',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    categoryKey: 'home.newsCategories.laborLaw',
    slug: 'labor-law-changes-2025',
    readingTime: '5',
    date: '2024-03-20',
    author: {
      name: 'Dr. Ahmed Hassan',
      title: 'Labor Law Expert',
      image: 'https://example.com/author1.jpg'
    },
    tags: ['labor_law', 'legal_updates', 'employment']
  },
  {
    id: '2',
    titleKey: 'home.newsItems.businessRegistration',
    descriptionKey: 'home.newsItems.businessRegistrationDesc',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    categoryKey: 'home.newsCategories.businessLaw',
    slug: 'understanding-business-registration',
    readingTime: '7',
    date: '2024-03-19',
    author: {
      name: 'Sarah Ahmed',
      title: 'Business Law Specialist',
      image: 'https://example.com/author2.jpg'
    },
    tags: ['business_law', 'company_registration', 'startups']
  },
  {
    id: '3',
    titleKey: 'home.newsItems.propertyRights',
    descriptionKey: 'home.newsItems.propertyRightsDesc',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    categoryKey: 'home.newsCategories.propertyLaw',
    slug: 'property-rights-guide',
    readingTime: '6',
    date: '2024-03-18',
    author: {
      name: 'Leila Mahmoud',
      title: 'Property Law Expert',
      image: 'https://example.com/author3.jpg'
    },
    tags: ['property_law', 'real_estate', 'legal_guide']
  }
];

const FEATURED_LAWYERS = [
  {
    id: '1',
    nameKey: 'lawyers.names.sarahAhmed',
    specializationKey: 'legal_categories.business_law',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    rating: 4.9,
    reviewCount: 127,
    experience: 8,
    languages: ['en', 'ar', 'fr'],
    availability: 'online',
    consultationFee: 150,
    verifiedStatus: true,
    slug: 'sarah-ahmed'
  },
  {
    id: '2',
    nameKey: 'lawyers.names.mohamedHassan',
    specializationKey: 'legal_categories.criminal_law',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800',
    rating: 4.8,
    reviewCount: 98,
    experience: 12,
    languages: ['ar', 'en'],
    availability: 'offline',
    consultationFee: 200,
    verifiedStatus: true,
    slug: 'mohamed-hassan'
  },
  {
    id: '3',
    nameKey: 'lawyers.names.leilaKarim',
    specializationKey: 'legal_categories.family_law',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    rating: 4.7,
    reviewCount: 156,
    experience: 15,
    languages: ['ar', 'en', 'fr'],
    availability: 'both',
    consultationFee: 180,
    verifiedStatus: true,
    slug: 'leila-karim'
  }
];

const LawyerCard = ({ lawyer, onPress }) => {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';
  const router = useRouter();

  return (
    <View style={styles.lawyerCardContainer}>
      <Pressable 
        style={[styles.lawyerCard, getCardStyle(isDark)]}
        onPress={onPress}
      >
        <View style={styles.lawyerImageContainer}>
          <Image 
            source={{ uri: lawyer.image }} 
            style={styles.lawyerImage}
          />
          {lawyer.verifiedStatus && (
            <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
              <CheckCircle2 size={12} color="white" />
            </View>
          )}
          <View style={styles.quickStats}>
            <View style={styles.statBadge}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.statText}>{lawyer.rating}</Text>
            </View>
            <View style={styles.statBadge}>
              <Clock size={12} color="white" />
              <Text style={styles.statText}>{lawyer.experience}Y</Text>
            </View>
          </View>
        </View>

        <View style={styles.lawyerInfo}>
          <View style={styles.nameContainer}>
            <Text style={[styles.lawyerName, { color: colors.text }]} numberOfLines={1}>
              {t(lawyer.nameKey)}
            </Text>
            <View style={[styles.priceBadge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.priceText, { color: colors.primary }]}>
                ${lawyer.consultationFee}
              </Text>
            </View>
          </View>

          <Text style={[styles.lawyerSpecialization, { color: colors.subText }]} numberOfLines={1}>
            {t(lawyer.specializationKey)}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.availabilityContainer}>
              {lawyer.availability === 'online' || lawyer.availability === 'both' ? (
                <View style={styles.availabilityBadge}>
                  <Globe size={12} color={colors.primary} />
                  <Text style={[styles.availabilityText, { color: colors.primary }]}>
                    {t('lawyers.online')}
                  </Text>
                </View>
              ) : null}
              {lawyer.availability === 'offline' || lawyer.availability === 'both' ? (
                <View style={styles.availabilityBadge}>
                  <MapPin size={12} color={colors.primary} />
                  <Text style={[styles.availabilityText, { color: colors.primary }]}>
                    {t('lawyers.inPerson')}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.languagesRow}>
            {lawyer.languages.map((lang) => (
              <View 
                key={lang} 
                style={[
                  styles.languageBadge,
                  { backgroundColor: colors.border }
                ]}
              >
                <Text style={[styles.languageText, { color: colors.text }]}>
                  {t(`language.${lang}`)}
                </Text>
              </View>
            ))}
          </View>

          <Pressable 
            style={[styles.bookButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push(`/lawyers/${lawyer.slug}/book`)}
          >
            <Text style={styles.bookButtonText}>
              {t('lawyers.bookNow')}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';
  const router = useRouter();

  const handleNewsPress = (slug: string) => {
    router.push(`/news/${slug}`);
  };

  const handleLawyerPress = (slug: string) => {
    router.push(`/lawyers/${slug}`);
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/news/category/${category}`);
  };

  const renderBlogCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.blogCategoriesContainer}
    >
      {BLOG_CATEGORIES.map((category) => (
        <Pressable
          key={category}
          style={[styles.blogCategoryChip, { backgroundColor: colors.primary }]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text style={styles.blogCategoryText}>
            {t(`home.blogCategories.${category}`)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  const renderNewsCard = (item: typeof NEWS_ITEMS[0]) => (
    <Pressable 
      key={item.id} 
      style={[styles.newsCard, getCardStyle(isDark)]}
      onPress={() => handleNewsPress(item.slug)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.newsImage} 
      />
      <View style={styles.newsContent}>
        <View style={styles.newsMetadata}>
          <Text style={[styles.newsCategory, { color: colors.primary }]}>
            {t(item.categoryKey)}
          </Text>
          <View style={styles.readingTimeContainer}>
            <Calendar size={12} color={colors.subText} />
            <Text style={[styles.newsDate, { color: colors.subText }]}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={[styles.newsTitle, { color: colors.text }]}>
          {t(item.titleKey)}
        </Text>
        <Text 
          numberOfLines={2} 
          style={[styles.newsDescription, { color: colors.subText }]}
        >
          {t(item.descriptionKey)}
        </Text>
        <View style={styles.authorContainer}>
          <Image 
            source={{ uri: item.author.image }} 
            style={styles.authorImage} 
          />
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {item.author.name}
            </Text>
            <Text style={[styles.authorTitle, { color: colors.subText }]}>
              {item.author.title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderFeaturedLawyers = () => (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeaderContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('home.featuredLawyers')}
        </Text>
        <Pressable onPress={() => router.push('/lawyers')}>
          <View style={styles.viewAllContainer}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>
              {t('home.viewAll')}
            </Text>
            <ChevronRight size={16} color={colors.primary} />
          </View>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lawyersContainer}
      >
        {FEATURED_LAWYERS.map((lawyer) => (
          <LawyerCard
            key={lawyer.id}
            lawyer={lawyer}
            onPress={() => router.push(`/lawyers/${lawyer.slug}`)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.heroSection}>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          {t('home.welcome')}
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.subText }]}>
          {t('home.heroSubtitle')}
        </Text>
      </View>

      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('home.categories')}
          </Text>
          <Pressable onPress={() => router.push('/categories')}>
            <View style={styles.viewAllContainer}>
              <Text style={[styles.viewAll, { color: colors.primary }]}>
                {t('home.viewAll')}
              </Text>
              <ChevronRight size={16} color={colors.primary} />
            </View>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          <CategoryCard icon={Scale} title={t('home.businessLaw')} onPress={() => {}} />
          <CategoryCard icon={Gavel} title={t('home.criminalLaw')} onPress={() => {}} />
          <CategoryCard icon={Users} title={t('home.familyLaw')} onPress={() => {}} />
          <CategoryCard icon={FileText} title={t('home.civilLaw')} onPress={() => {}} />
          <CategoryCard icon={Building2} title={t('home.realEstate')} onPress={() => {}} />
        </ScrollView>
      </View>

      <Pressable 
        style={[styles.adBanner, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/premium-consultation')}>
        <Text style={styles.adText}>{t('home.ads.premiumConsultation')}</Text>
        <Text style={styles.adCTA}>{t('home.ads.learnMore')}</Text>
      </Pressable>

      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('home.latestNews')}
          </Text>
          <Pressable onPress={() => router.push('/news')}>
            <View style={styles.viewAllContainer}>
              <Text style={[styles.viewAll, { color: colors.primary }]}>
                {t('home.viewAll')}
              </Text>
              <ChevronRight size={16} color={colors.primary} />
            </View>
          </Pressable>
        </View>
        {renderBlogCategories()}
        {NEWS_ITEMS.map(renderNewsCard)}
      </View>

      <View style={[styles.legalHelpCard, getCardStyle(isDark)]}>
        <Text style={[styles.legalHelpTitle, { color: colors.text }]}>
          {t('home.needLegalHelp')}
        </Text>
        <Text style={[styles.legalHelpDescription, { color: colors.subText }]}>
          {t('home.legalHelpDescription')}
        </Text>
        <View style={styles.legalHelpButtons}>
          <Pressable 
            style={[styles.chatbotButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/chatbot')}
          >
            <MessageCircle size={20} color="white" />
            <Text style={styles.buttonText}>
              {t('home.getAIHelp')}
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.consultingButton, { backgroundColor: colors.secondary }]}
            onPress={() => router.push('/lawyers')}
          >
            <Users size={20} color="white" />
            <Text style={styles.buttonText}>
              {t('home.getLawyerConsulting')}
            </Text>
          </Pressable>
        </View>
      </View>

      {renderFeaturedLawyers()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heroSection: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    opacity: 0.8,
  },
  sectionWrapper: {
    marginBottom: 32,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  categoriesContainer: {
    gap: 12,
    paddingHorizontal: 4,
  },
  adBanner: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  adText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
  },
  adCTA: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  newsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 16,
  },
  newsMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
  },
  readingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newsDate: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    marginBottom: 16,
    lineHeight: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
  },
  authorTitle: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
  },
  legalHelpCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  legalHelpTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  legalHelpDescription: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  legalHelpButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  chatbotButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  consultingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  lawyersContainer: {
    paddingRight: 16,
  },
  lawyerCardContainer: {
    width: 300,
    marginRight: 16,
  },
  lawyerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lawyerImageContainer: {
    position: 'relative',
    height: 180,
  },
  lawyerImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  quickStats: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
  },
  lawyerInfo: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  lawyerName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    flex: 1,
  },
  priceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
  },
  lawyerSpecialization: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    marginBottom: 12,
  },
  detailsRow: {
    marginBottom: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
  },
  bookButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  blogCategoriesContainer: {
    marginBottom: 16,
  },
  blogCategoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  blogCategoryText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
});