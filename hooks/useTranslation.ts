import { I18n } from 'i18n-js';
import { useCallback } from 'react';
import * as Localization from 'expo-localization';

const i18n = new I18n({
  ar: {
    appName: 'مُلقانون',
    tabs: {
      home: 'الرئيسية',
      chatbot: 'المساعد القانوني',
      lawyers: 'محامون',
      offices: 'مكاتب حكومية'
    },
    home: {
      latestNews: 'آخر الأخبار',
      viewAll: 'عرض الكل',
      categories: 'التصنيفات',
      searchPlaceholder: 'ابحث عن موضوع قانوني...',
      featuredLawyers: 'محامون مميزون'
    },
    chatbot: {
      welcome: 'مرحباً بك في المساعد القانوني',
      placeholder: 'اكتب سؤالك القانوني هنا...',
      startChat: 'ابدأ المحادثة',
      connecting: 'جاري الاتصال...',
      examples: 'أمثلة على الأسئلة'
    },
    lawyers: {
      search: 'ابحث عن محامي',
      filters: 'التصفية',
      specializations: 'التخصصات',
      location: 'الموقع',
      experience: 'الخبرة',
      book: 'احجز موعد'
    },
    offices: {
      searchOffice: 'ابحث عن مكتب',
      nearMe: 'بالقرب مني',
      categories: {
        courts: 'المحاكم',
        notaries: 'الموثقين',
        police: 'مراكز الشرطة'
      }
    }
  },
  fr: {
    appName: 'Moll9anoun',
    tabs: {
      home: 'Accueil',
      chatbot: 'Assistant Juridique',
      lawyers: 'Avocats',
      offices: 'Bureaux'
    },
    home: {
      latestNews: 'Dernières Actualités',
      viewAll: 'Voir Tout',
      categories: 'Catégories',
      searchPlaceholder: 'Rechercher un sujet juridique...',
      featuredLawyers: 'Avocats en Vedette'
    },
    chatbot: {
      welcome: 'Bienvenue sur l\'Assistant Juridique',
      placeholder: 'Tapez votre question juridique ici...',
      startChat: 'Démarrer la Discussion',
      connecting: 'Connexion en cours...',
      examples: 'Exemples de Questions'
    },
    lawyers: {
      search: 'Rechercher un Avocat',
      filters: 'Filtres',
      specializations: 'Spécialisations',
      location: 'Localisation',
      experience: 'Expérience',
      book: 'Réserver'
    },
    offices: {
      searchOffice: 'Rechercher un Bureau',
      nearMe: 'Près de Moi',
      categories: {
        courts: 'Tribunaux',
        notaries: 'Notaires',
        police: 'Postes de Police'
      }
    }
  },
  en: {
    appName: 'Moll9anoun',
    tabs: {
      home: 'Home',
      chatbot: 'Legal Assistant',
      lawyers: 'Lawyers',
      offices: 'Offices'
    },
    home: {
      latestNews: 'Latest News',
      viewAll: 'View All',
      categories: 'Categories',
      searchPlaceholder: 'Search for a legal topic...',
      featuredLawyers: 'Featured Lawyers'
    },
    chatbot: {
      welcome: 'Welcome to Legal Assistant',
      placeholder: 'Type your legal question here...',
      startChat: 'Start Chat',
      connecting: 'Connecting...',
      examples: 'Example Questions'
    },
    lawyers: {
      search: 'Search for a Lawyer',
      filters: 'Filters',
      specializations: 'Specializations',
      location: 'Location',
      experience: 'Experience',
      book: 'Book'
    },
    offices: {
      searchOffice: 'Search for an Office',
      nearMe: 'Near Me',
      categories: {
        courts: 'Courts',
        notaries: 'Notaries',
        police: 'Police Stations'
      }
    }
  }
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'ar';

export function useTranslation() {
  const t = useCallback((key: string, params = {}) => {
    return i18n.t(key, params);
  }, []);

  const setLanguage = useCallback((lang: string) => {
    i18n.locale = lang;
  }, []);

  const getCurrentLanguage = useCallback(() => {
    return i18n.locale;
  }, []);

  return { t, setLanguage, getCurrentLanguage };
}