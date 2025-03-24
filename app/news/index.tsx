import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { useRouter } from 'expo-router';
import { Search, Filter, Calendar, Clock, Tag } from 'lucide-react-native';

// Move to a separate file or API call
const BLOG_CATEGORIES = [
  'legal_updates', 'case_studies', 'legal_tips', 'court_decisions', 
  'family_law', 'criminal_law', 'business_law', 'property_law'
];

const BLOG_POSTS = [
  {
    id: '1',
    titleKey: 'blogs.titles.laborLawChanges',
    descriptionKey: 'blogs.descriptions.laborLawChanges',
    content: 'blogs.content.laborLawChanges',
    image: 'https://example.com/labor-law.jpg',
    category: 'legal_updates',
    slug: 'labor-law-changes-2025',
    readingTime: '5',
    date: '2024-03-20',
    author: {
      name: 'Dr. Ahmed Hassan',
      title: 'Labor Law Expert',
      image: 'https://example.com/author1.jpg'
    },
    tags: ['labor_law', 'legal_updates', 'employment'],
    relatedPosts: ['2', '3']
  },
  // ... more blog posts
];

export default function BlogsScreen() {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery === '' || 
      t(post.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.subText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('blogs.searchPlaceholder')}
            placeholderTextColor={colors.subText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => {/* Show filter modal */}}
        >
          <Filter size={20} color="white" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <Pressable
          style={[
            styles.categoryChip,
            !selectedCategory && { backgroundColor: colors.primary }
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && styles.selectedCategoryText
          ]}>
            {t('blogs.allCategories')}
          </Text>
        </Pressable>
        {BLOG_CATEGORIES.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {t(`blogs.categories.${category}`)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Blog Posts */}
      <View style={styles.postsContainer}>
        {filteredPosts.map((post) => (
          <Pressable
            key={post.id}
            style={[styles.postCard, getCardStyle(isDark)]}
            onPress={() => router.push(`/news/${post.slug}`)}
          >
            <Image
              source={{ uri: post.image }}
              style={styles.postImage}
            />
            <View style={styles.postContent}>
              <View style={styles.postMetadata}>
                <Text style={[styles.postCategory, { color: colors.primary }]}>
                  {t(`blogs.categories.${post.category}`)}
                </Text>
                <View style={styles.postStats}>
                  <View style={styles.statItem}>
                    <Calendar size={14} color={colors.subText} />
                    <Text style={[styles.statText, { color: colors.subText }]}>
                      {new Date(post.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={14} color={colors.subText} />
                    <Text style={[styles.statText, { color: colors.subText }]}>
                      {t('blogs.readingTime', { minutes: post.readingTime })}
                    </Text>
                  </View>
                </View>
              </View>
              
              <Text style={[styles.postTitle, { color: colors.text }]}>
                {t(post.titleKey)}
              </Text>
              
              <Text 
                style={[styles.postDescription, { color: colors.subText }]}
                numberOfLines={3}
              >
                {t(post.descriptionKey)}
              </Text>

              <View style={styles.tagsContainer}>
                {post.tags.map((tag) => (
                  <View key={tag} style={styles.tagChip}>
                    <Tag size={12} color={colors.primary} />
                    <Text style={[styles.tagText, { color: colors.primary }]}>
                      {t(`blogs.tags.${tag}`)}
                    </Text>
                  </View>
                ))}
              </View>

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
                    {post.author.title}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
} 