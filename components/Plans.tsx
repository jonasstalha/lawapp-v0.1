import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyle } from '@/utils/styleUtils';
import { useRouter } from 'expo-router';    


const Plans = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();
    
    
}

export default Plans;
