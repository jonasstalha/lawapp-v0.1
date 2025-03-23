import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { Send, User, Bot } from 'lucide-react-native';

const EXAMPLE_QUESTIONS = [
  "What are the requirements for starting a business in Morocco?",
  "How do I file for divorce?",
  "What are my rights as an employee?",
  "How can I register a trademark?",
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotScreen() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your question. Please wait a moment...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>{t('chatbot.welcome')}</Text>
          <Text style={styles.welcomeSubtitle}>{t('chatbot.examples')}</Text>
          <View style={styles.examplesContainer}>
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <Pressable
                key={index}
                style={styles.exampleButton}
                onPress={() => setMessage(question)}>
                <Text style={styles.exampleText}>{question}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.isUser ? styles.userMessage : styles.botMessage,
            ]}>
            <View style={styles.messageIconContainer}>
              {msg.isUser ? (
                <User size={20} color="#ffffff" />
              ) : (
                <Bot size={20} color="#ffffff" />
              )}
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timestamp}>
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={t('chatbot.placeholder')}
          placeholderTextColor="#64748b"
          multiline
        />
        <Pressable
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!message.trim()}>
          <Send size={20} color={message.trim() ? '#ffffff' : '#94a3b8'} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  welcomeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#64748b',
    marginBottom: 16,
  },
  examplesContainer: {
    gap: 8,
  },
  exampleButton: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
  },
  exampleText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#2563eb',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  messageIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1e293b',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1e293b',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  sendButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
});