import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { EXPO_PUBLIC_OPENAI_API_KEY } from '@env';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import * as Localization from 'expo-localization';

// Legal categories for quick access
const legalCategories = [
  'marriage_procedures',
  'property_registration',
  'business_setup',
  'divorce_process',
  'work_permits',
  'inheritance_law'
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Add retry configuration
const API_CONFIG = {
  MAX_RETRIES: 2,
  TIMEOUT: 8000,
  RETRY_DELAY: 1000,
};

// Enhanced language detection
const getPreferredLanguage = () => {
  try {
    const locale = Localization.locale?.split('-')[0] || 'en';
    return ['ar', 'fr', 'en'].includes(locale) ? locale : 'en';
  } catch (error) {
    console.warn('Language detection failed:', error);
    return 'en';  // Fallback to English
  }
};

export default function ChatbotScreen() {
  const { t } = useTranslation();
  const { colors, mode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const isDark = mode === 'dark';
  const userLanguage = getPreferredLanguage();
  
  // Update theme colors to use the global theme
  const theme = {
    background: colors.background,
    cardBg: colors.card,
    userBubble: colors.primary,
    text: colors.text,
    inputBg: colors.input,
    inputText: colors.text,
    disabledButton: isDark ? '#404040' : '#E0E0E0',
    disabledText: colors.subText,
    loadingIndicator: colors.primary,
  };

  const triggerHapticFeedback = async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Silently handle haptics errors
        console.debug('Haptics not available:', error);
      }
    }
  };

  const generateSystemPrompt = (userMessage: string) => {
    const prompts = {
      en: {
        main: `You are a specialized Moroccan legal assistant. Provide:
1) Exact required documents
2) Where and how to apply
3) Fees and costs
4) Processing time

Base all responses on the 2011 Moroccan Constitution and current laws.
If the request is unclear, ask: "Which specific legal procedure do you need help with?"
Respond in clear bullet points.`,
        clarification: "Could you please specify which legal procedure you're inquiring about?"
      },
      fr: {
        main: `Vous êtes un assistant juridique marocain spécialisé. Fournissez:
1) Documents requis avec précision
2) Où et comment postuler
3) Frais et coûts
4) Délais de traitement

Basez toutes les réponses sur la Constitution marocaine de 2011 et les lois en vigueur.
Si la demande n'est pas claire, demandez: "Quelle procédure légale spécifique vous intéresse?"
Répondez en points clairs.`,
        clarification: "Pourriez-vous préciser quelle procédure légale vous intéresse?"
      },
      ar: {
        main: `أنت مساعد قانوني مغربي متخصص. قدم:
1) الوثائق المطلوبة بدقة
2) مكان وكيفية التقديم
3) الرسوم والتكاليف
4) المدة الزمنية للإجراءات

استند إلى دستور المغرب 2011 والقوانين السارية.
إذا كان الطلب غير واضح، اسأل: "ما هو الإجراء القانوني المحدد الذي تحتاج المساعدة به؟"
قدم إجابات في نقاط واضحة.`,
        clarification: "هل يمكنك تحديد الإجراء القانوني الذي تستفسر عنه؟"
      }
    };

    return prompts[userLanguage] || prompts.en;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const sendMessage = async (content: string, retryCount = 0) => {
    try {
      setIsLoading(true);
      await triggerHapticFeedback();

      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const { main: systemPrompt } = generateSystemPrompt(content);

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.slice(-3),
            userMessage,
          ],
          max_tokens: 250,
          temperature: 0.1,
          top_p: 0.9,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        },
        {
          headers: {
            'Authorization': `Bearer ${EXPO_PUBLIC_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: API_CONFIG.TIMEOUT,
        }
      );

      if (response.data?.choices?.[0]?.message?.content) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.choices[0].message.content
        }]);
      } else {
        throw new Error('Invalid API response');
      }

    } catch (error) {
      console.error('API Error:', error);
      
      // Implement retry mechanism
      if (retryCount < API_CONFIG.MAX_RETRIES) {
        await sleep(API_CONFIG.RETRY_DELAY);
        return sendMessage(content, retryCount + 1);
      }

      // Multilingual error messages
      const errorMessages = {
        en: "Sorry, I couldn't process your request. Please try again.",
        fr: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        ar: "عذراً، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى."
      };

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessages[userLanguage] || errorMessages.en
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCategory = (category: string) => {
    const categoryPrompts = {
      'marriage_procedures': 'الإجراءات القانونية للزواج في المغرب',
      'property_registration': 'تسجيل الممتلكات وإجراءاته القانونية',
      'business_setup': 'خطوات إنشاء شركة في المغرب',
      'divorce_process': 'إجراءات الطلاق القانونية',
      'work_permits': 'تصاريح العمل للمواطنين والأجانب',
      'inheritance_law': 'قوانين الميراث في المغرب'
    };

    sendMessage(categoryPrompts[category] || t(`legal_categories.${category}`));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          title: t('chatbot.title'),
          headerStyle: { backgroundColor: colors.card },
          headerShadowVisible: false,
          headerTintColor: colors.text,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 60, paddingVertical: 10 }}
        >
          {legalCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => selectCategory(category)}
              style={{
                marginHorizontal: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: colors.card,
                borderRadius: 20,
                shadowColor: colors.text,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0.3 : 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text style={{ color: colors.text }}>
                {t(`legal_categories.${category}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.role === 'user' ? colors.primary : colors.card,
                padding: 12,
                margin: 8,
                borderRadius: 16,
                maxWidth: '80%',
                shadowColor: colors.text,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isDark ? 0.3 : 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: message.role === 'user' ? '#fff' : colors.text,
                }}
              >
                {message.content}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <BlurView 
          intensity={isDark ? 40 : 80} 
          tint={isDark ? "dark" : "light"} 
          style={{ 
            padding: 10,
            backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' 
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.input,
              borderRadius: 25,
              padding: 5,
              marginBottom: Platform.OS === 'ios' ? 20 : 10,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={t('chatbot.input_placeholder')}
              placeholderTextColor={colors.subText}
              style={{
                flex: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                color: colors.text,
              }}
              multiline
            />
            <TouchableOpacity
              onPress={() => input.trim() && sendMessage(input.trim())}
              disabled={!input.trim() || isLoading}
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: input.trim() ? colors.primary : theme.disabledButton,
                alignSelf: 'flex-end',
              }}
            >
              <MaterialIcons
                name="send"
                size={24}
                color={input.trim() ? '#fff' : theme.disabledText}
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </View>
  );
}
