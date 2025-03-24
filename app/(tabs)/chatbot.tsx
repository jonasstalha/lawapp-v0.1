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
import { Send, User, Bot } from 'lucide-react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import Constants from 'expo-constants';

const OPENAI_API_KEY_EXPO = Constants.expoConfig?.extra?.openaiApiKey;

if (!OPENAI_API_KEY_EXPO) {
  console.error('OpenAI API key is not set in environment variables');
}

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

async function getAIResponse(userMessage: string) {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const API_URL = Platform.OS === 'web' 
      ? '/api/chat' // Use your backend proxy URL for web
      : 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error getting AI response:', error);
    return Platform.OS === 'web'
      ? "Error: Please check your network connection or try again later."
      : "Sorry, I encountered an error processing your request.";
  }
}

const ErrorFallback = () => (
  <View style={styles.container}>
    <Text>Something went wrong. Please refresh the page.</Text>
  </View>
);

export default function ChatbotScreen() {
  if (Platform.OS === 'web' && !OPENAI_API_KEY_EXPO) {
    return <ErrorFallback />;
  }

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "I'm processing your question. Please wait a moment...",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    const aiResponse = await getAIResponse(userMessage.text);
    
    setMessages((prev) => prev.map(msg => 
      msg.id === loadingMessage.id 
        ? { ...msg, text: aiResponse, timestamp: new Date() }
        : msg
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        <View style={styles.examplesContainer}>
          {EXAMPLE_QUESTIONS.map((question, index) => (
            <Pressable key={index} style={styles.exampleButton} onPress={() => setMessage(question)}>
              <Text style={styles.exampleText}>{question}</Text>
            </Pressable>
          ))}
        </View>

        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageContainer, msg.isUser ? styles.userMessage : styles.botMessage]}>
            <View style={styles.messageIconContainer}>
              {msg.isUser ? <User size={20} color="#fff" /> : <Bot size={20} color="#fff" />}
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timestamp}>{msg.timestamp.toLocaleTimeString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          multiline
        />
        <Pressable style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]} onPress={sendMessage} disabled={!message.trim()}>
          <Send size={20} color={!message.trim() ? '#aaa' : '#fff'} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  messagesContainer: { flex: 1, padding: 16 },
  examplesContainer: { gap: 8, padding: 16 },
  exampleButton: { backgroundColor: '#ddd', borderRadius: 8, padding: 12 },
  exampleText: { fontSize: 14, color: '#333' },
  messageContainer: { flexDirection: 'row', marginBottom: 16, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  botMessage: { alignSelf: 'flex-start' },
  messageIconContainer: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 },
  messageContent: { backgroundColor: '#fff', borderRadius: 16, padding: 12, elevation: 5 },
  messageText: { fontSize: 16, color: '#000' },
  timestamp: { fontSize: 12, color: '#666', marginTop: 4 },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#000' },
  sendButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: '#ccc' },
});