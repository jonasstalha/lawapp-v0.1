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
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
console.log("OpenAI API Key:", OPENAI_API_KEY);
import Constants from 'expo-constants';

const OPENAI_API_KEY_EXPO = Constants.expoConfig?.extra?.openaiApiKey || OPENAI_API_KEY;

if (!OPENAI_API_KEY_EXPO) {
  console.error('OpenAI API key is not set in environment variables');
}

const EXAMPLE_QUESTIONS = [
  "What are the requirements for starting a business in Morocco?",
  "How do I file for divorce?",
  "What are my rights as an employee?",
  "How can I register a trademark?",
];

async function getAIResponse(userMessage) {
  try {
    if (!OPENAI_API_KEY_EXPO) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY_EXPO}`,
        },
      }
    );

    return response.data?.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error('Error getting AI response:', error);
    return "Error: Unable to process your request at the moment.";
  }
}

export default function ChatbotScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      text: "I'm processing your question...",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    const aiResponse = await getAIResponse(userMessage.text);

    setMessages((prev) => [...prev.filter(msg => msg.id !== loadingMessage.id), {
      id: (Date.now() + 2).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date(),
    }]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
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