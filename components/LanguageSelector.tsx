import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Languages } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage, LANGUAGES, Language } from '@/context/LanguageContext';

export function LanguageSelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const handleLanguageSelect = (language: Language) => {
    setLocale(language);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Languages size={24} color={colors.text} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      locale === lang ? colors.primary : 'transparent',
                  },
                ]}
                onPress={() => handleLanguageSelect(lang)}
              >
                <Text
                  style={[
                    styles.languageText,
                    {
                      color: locale === lang ? '#ffffff' : colors.text,
                      fontFamily: lang === 'ar' ? 'Cairo' : undefined,
                    },
                  ]}
                >
                  {t(`language.${lang}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  languageText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 