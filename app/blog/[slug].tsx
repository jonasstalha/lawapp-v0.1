import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { Calendar, Clock, Share2, ArrowLeft, Bookmark, MessageCircle } from 'lucide-react-native';

// Import NEWS_ITEMS from the home page
const NEWS_ITEMS = [
  {
    id: 1,
    slug: 'new-corporate-law-2024',
    image: 'https://picsum.photos/800/600',
    categoryKey: 'home.newsCategories.corporateLaw',
    date: '2024-03-15',
    titleKey: 'home.news.corporateLawChanges.title',
    descriptionKey: 'home.news.corporateLawChanges.description',
    contentKey: 'home.news.corporateLawChanges.content',
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
    contentKey: 'home.news.environmentalRegulations.content',
    author: {
      name: 'Jane Smith',
      title: 'home.news.environmentalRegulations.authorTitle',
      image: 'https://i.pravatar.cc/150?img=2'
    }
  }
];

// Custom component to render formatted content
const ContentRenderer = ({ content, style }) => {
  const paragraphs = content.split('\n\n');
  
  return (
    <View>
      {paragraphs.map((paragraph, index) => {
        // Handle headings
        if (paragraph.startsWith('# ')) {
          return (
            <Text key={index} style={[styles.heading1, style]}>
              {paragraph.slice(2)}
            </Text>
          );
        }
        if (paragraph.startsWith('## ')) {
          return (
            <Text key={index} style={[styles.heading2, style]}>
              {paragraph.slice(3)}
            </Text>
          );
        }
        
        // Handle bullet points
        if (paragraph.startsWith('- ')) {
          return (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.paragraph, style]}>
                {paragraph.slice(2)}
              </Text>
            </View>
          );
        }
        
        // Handle numbered lists
        if (paragraph.match(/^\d+\. /)) {
          return (
            <View key={index} style={styles.numberedPoint}>
              <Text style={styles.number}>
                {paragraph.match(/^\d+/)[0]}.
              </Text>
              <Text style={[styles.paragraph, style]}>
                {paragraph.replace(/^\d+\. /, '')}
              </Text>
            </View>
          );
        }
        
        // Handle regular paragraphs
        return (
          <Text key={index} style={[styles.paragraph, style]}>
            {paragraph}
          </Text>
        );
      })}
    </View>
  );
};

const BlogPostScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  
  const post = NEWS_ITEMS.find(item => item.slug === slug);
  
  if (!post) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          {t('home.news.postNotFound')}
        </Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: t(post.titleKey),
        url: `https://yourdomain.com/news/${post.slug}`
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
      </View>

      <Image 
        source={{ uri: post.image }} 
        style={styles.coverImage} 
      />
      
      <View style={styles.content}>
        <View style={styles.metadata}>
          <View style={styles.categoryContainer}>
            <Text style={[styles.category, { color: colors.primary }]}>
              {t(post.categoryKey)}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Calendar size={16} color={colors.subText} />
            <Text style={[styles.date, { color: colors.subText }]}>
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>
          {t(post.titleKey)}
        </Text>
        
        <View style={styles.authorContainer}>
          <Image 
            source={{ uri: post.author.image }} 
            style={styles.authorImage} 
          />
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {post.author.name}
            </Text>
            <Text style={[styles.authorTitle, { color: colors.subText }]}>
              {t(post.author.title)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <MessageCircle size={20} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.primary }]}>
              {t('home.news.shareArticle')}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.primary }]}>
              {t('home.news.shareArticle')}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Bookmark size={20} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.primary }]}>
              {t('home.news.bookmarkArticle')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          <ContentRenderer 
            content={t(post.contentKey)}
            style={{ color: colors.text }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    backgroundColor: '#4CAF5015',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    marginBottom: 16,
    lineHeight: 36,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    marginBottom: 2,
  },
  authorTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    marginLeft: 8,
  },
  contentContainer: {
    marginBottom: 32,
  },
  heading1: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    marginVertical: 16,
    lineHeight: 36,
  },
  heading2: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    marginVertical: 14,
    lineHeight: 32,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    lineHeight: 24,
    marginVertical: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 8,
  },
  numberedPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  number: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    marginRight: 8,
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    textAlign: 'center',
    marginTop: 32,
  }
});

export default BlogPostScreen; 