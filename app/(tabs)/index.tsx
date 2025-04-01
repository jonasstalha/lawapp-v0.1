import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { useRouter } from 'expo-router';
import { Scale, Gavel, Users, Building2, FileText, ChevronRight, MessageCircle, Calendar, Star, Check, Globe, MapPin, Clock, CheckCircle2, BookOpen, Briefcase, Building, DollarSign, HardHat, Globe2, Leaf, Shield, ScrollText, Search, Bell, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

// Existing constants and component definitions...

interface NewsItem {
  id: number;
  slug: string;
  image: string;
  categoryKey: string;
  date: string;
  titleKey: string;
  descriptionKey: string;
  author: {
    name: string;
    title: string;
    image: string;
  }
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    slug: 'new-corporate-law-2024',
    image: 'https://picsum.photos/800/600',
    categoryKey: 'home.newsCategories.corporateLaw',
    date: '2024-03-15',
    titleKey: 'home.news.corporateLawChanges.title',
    descriptionKey: 'home.news.corporateLawChanges.description',
    author: {
      name: 'John Doe',
      title: 'home.news.corporateLawChanges.authorTitle',
      image: 'https://i.pravatar.cc/150?img=1'
    }
  },
  {
    id: 2,
    slug: 'environmental-regulations-update',
    image: 'https://picsum.photos/800/600?random=2',
    categoryKey: 'home.newsCategories.environmentalLaw',
    date: '2024-03-14',
    titleKey: 'home.news.environmentalRegulations.title',
    descriptionKey: 'home.news.environmentalRegulations.description',
    author: {
      name: 'Jane Smith',
      title: 'home.news.environmentalRegulations.authorTitle',
      image: 'https://i.pravatar.cc/150?img=2'
    }
  }
];

const BLOG_CATEGORIES = [
  'legal_updates',
  'case_studies',
  'legal_tips',
  'industry_news',
  'regulations'
];

const FEATURED_LAWYERS = [
  {
    id: 1,
    slug: 'john-doe',
    name: 'John Doe',
    specialization: 'Corporate Law',
    image: 'https://i.pravatar.cc/300?img=3',
    rating: 4.9,
    reviewCount: 128,
    experience: 15,
    isVerified: true,
    languages: ['English', 'Arabic'],
    availability: {
      nextSlot: 'Tomorrow',
      status: 'available'
    },
    price: 300
  },
  {
    id: 2,
    slug: 'jane-smith',
    name: 'Jane Smith',
    specialization: 'Family Law',
    image: 'https://i.pravatar.cc/300?img=4',
    rating: 4.8,
    reviewCount: 95,
    experience: 12,
    isVerified: true,
    languages: ['English', 'French', 'Arabic'],
    availability: {
      nextSlot: 'Today',
      status: 'available'
    },
    price: 250
  }
];

const HomeHeader = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
      </View>
    </View>
  );
};

const QuickActions = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const QUICK_ACTIONS = [
    {
      icon: Scale,
      label: 'home.quickActions.findLawyer',
      color: '#4CAF50',
      route: '/lawyers'
    },
    {
      icon: MessageCircle,
      label: 'home.quickActions.chat',
      color: '#2196F3',
      route: '/chat'
    },
    {
      icon: Calendar,
      label: 'home.quickActions.appointments',
      color: '#FF9800',
      route: '/appointments'
    },
    {
      icon: FileText,
      label: 'home.quickActions.documents',
      color: '#9C27B0',
      route: '/documents'
    }
  ];

  return (
    <View style={styles.quickActionsContainer}>
      {QUICK_ACTIONS.map((action) => (
        <Pressable
          key={action.label}
          style={styles.quickActionButton}
          onPress={() => router.push(action.route)}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
            <action.icon size={24} color={action.color} />
          </View>
          <Text style={[styles.quickActionLabel, { color: colors.text }]}>
            {t(action.label)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const router = useRouter();
  const isDark = mode === 'dark';

  const renderNewsCard = (item: NewsItem) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const router = useRouter();
    const isDark = false;

    return (
      <Pressable 
        key={item.id} 
        style={[styles.newsCard, getCardStyle(isDark)]}
        onPress={() => router.push(`/blog/${item.slug}`)}
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
                {t(item.author.title)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderFeaturedLawyers = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const router = useRouter();
    const isDark = false;

    return (
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('home.featuredLawyers')}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lawyersContainer}
        >
          {FEATURED_LAWYERS.map((lawyer) => (
            <Pressable 
              key={lawyer.id}
              style={[styles.lawyerCardContainer]} 
              onPress={() => router.push(`/lawyers/${lawyer.slug}`)}
            >
              <View style={[styles.lawyerCard, getCardStyle(isDark)]}>
                <View style={styles.lawyerImageContainer}>
                  <Image 
                    source={{ uri: lawyer.image }}
                    style={styles.lawyerImage}
                  />
                  {lawyer.isVerified && (
                    <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
                      <CheckCircle2 size={12} color="white" />
                    </View>
                  )}
                  <View style={styles.quickStats}>
                    <View style={styles.statBadge}>
                      <Star size={12} color="white" />
                      <Text style={styles.statText}>{lawyer.rating}</Text>
                    </View>
                    <View style={styles.statBadge}>
                      <MessageCircle size={12} color="white" />
                      <Text style={styles.statText}>{lawyer.reviewCount}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.lawyerInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={[styles.lawyerName, { color: colors.text }]}>
                      {lawyer.name}
                    </Text>
                    <View style={[styles.priceBadge, { backgroundColor: colors.primary + '15' }]}>
                      <Text style={[styles.priceText, { color: colors.primary }]}>
                        ${lawyer.price}/hr
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.lawyerSpecialization, { color: colors.subText }]}>
                    {lawyer.specialization}
                  </Text>
                  <View style={styles.detailsRow}>
                    <View style={styles.availabilityContainer}>
                      <View style={styles.availabilityBadge}>
                        <Clock size={12} color={colors.subText} />
                        <Text style={[styles.availabilityText, { color: colors.subText }]}>
                          {t('home.lawyer.nextAvailable')}: {lawyer.availability.nextSlot}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.languagesRow}>
                    {lawyer.languages.map((lang) => (
                      <View 
                        key={lang}
                        style={[styles.languageBadge, { backgroundColor: colors.primary + '15' }]}
                      >
                        <Text style={[styles.languageText, { color: colors.primary }]}>
                          {lang}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Pressable 
                    style={[styles.bookButton, { backgroundColor: colors.primary }]}
                    onPress={() => router.push(`/lawyers/${lawyer.slug}`)}
                  >
                    <Text style={styles.bookButtonText}>
                      {t('home.lawyers.bookConsultation')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <QuickActions />
      
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('home.latestNews')}
          </Text>
        </View>
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
            style={[styles.consultingButton, { backgroundColor: colors.primary }]}
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
};

export default HomeScreen;

// Rest of the styles remain the same

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
    paddingHorizontal: 4,
    paddingBottom: 8,
    gap: 12,
  },
  categoryCardContainer: {
    width: 200,
    marginRight: 12,
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  quickActionButton: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontFamily: 'Cairo-Medium',
    textAlign: 'center',
  },
  cardGradient: {
    padding: 16,
    borderRadius: 12,
    height: '100%',
    justifyContent: 'space-between',
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  categoryCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#eaeaea',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Cairo-Bold',
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Cairo-Regular',
  },
});