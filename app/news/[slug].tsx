import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { Calendar, Clock, Share2, ArrowLeft, Bookmark } from 'lucide-react-native';
import { BLOG_POSTS, type BlogPost } from '@/data/blogPosts';

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

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';
  const router = useRouter();

  const post = BLOG_POSTS.find(p => p.slug === slug as string);

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          {t('blogs.postNotFound')}
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
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable 
            onPress={handleShare} 
            style={styles.actionButton}
          >
            <Share2 size={24} color={colors.text} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Bookmark size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Hero Image */}
      <Image
        source={{ uri: post.image }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.articleContainer}>
        <Text style={[styles.category, { color: colors.primary }]}>
          {t(`blogs.categories.${post.category}`)}
        </Text>
        
        <Text style={[styles.title, { color: colors.text }]}>
          {t(post.titleKey)}
        </Text>

        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Calendar size={16} color={colors.subText} />
            <Text style={[styles.metadataText, { color: colors.subText }]}>
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.metadataItem}>
            <Clock size={16} color={colors.subText} />
            <Text style={[styles.metadataText, { color: colors.subText }]}>
              {t('blogs.readingTime', { minutes: post.readingTime })}
            </Text>
          </View>
        </View>

        <View style={styles.authorSection}>
          <Image
            source={{ uri: post.author.image }}
            style={styles.authorImage}
          />
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {post.author.name}
            </Text>
            <Text style={[styles.authorTitle, { color: colors.subText }]}>
              {post.author.title}
            </Text>
          </View>
        </View>

        <ContentRenderer 
          content={t(post.content)}
          style={{ color: colors.text }}
        />

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {post.tags.map((tag) => (
            <View 
              key={tag} 
              style={[styles.tagChip, { backgroundColor: colors.border }]}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>
                {t(`blogs.tags.${tag}`)}
              </Text>
            </View>
          ))}
        </View>

        {/* Related Posts */}
        {post.relatedPosts?.length > 0 && (
          <View style={styles.relatedPosts}>
            <Text style={[styles.relatedTitle, { color: colors.text }]}>
              {t('blogs.relatedPosts')}
            </Text>
            {post.relatedPosts.map((relatedId) => {
              const relatedPost = BLOG_POSTS.find(p => p.id === relatedId);
              if (!relatedPost) return null;

              return (
                <Pressable
                  key={relatedId}
                  style={[styles.relatedCard, getCardStyle(isDark)]}
                  onPress={() => router.push(`/news/${relatedPost.slug}`)}
                >
                  <Image
                    source={{ uri: relatedPost.image }}
                    style={styles.relatedImage}
                  />
                  <View style={styles.relatedContent}>
                    <Text style={[styles.relatedPostTitle, { color: colors.text }]}>
                      {t(relatedPost.titleKey)}
                    </Text>
                    <Text 
                      style={[styles.relatedPostDescription, { color: colors.subText }]}
                      numberOfLines={2}
                    >
                      {t(relatedPost.descriptionKey)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: 250,
    marginBottom: 24,
  },
  articleContainer: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    marginBottom: 16,
    lineHeight: 36,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metadataText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  authorTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 24,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  relatedPosts: {
    marginTop: 32,
  },
  relatedTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    marginBottom: 16,
  },
  relatedCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  relatedImage: {
    width: 100,
    height: 100,
  },
  relatedContent: {
    flex: 1,
    padding: 12,
  },
  relatedPostTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    marginBottom: 4,
  },
  relatedPostDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  heading1: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    marginVertical: 16,
    lineHeight: 32,
  },
  heading2: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    marginVertical: 12,
    lineHeight: 28,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    marginVertical: 8,
    lineHeight: 24,
  },
}); 