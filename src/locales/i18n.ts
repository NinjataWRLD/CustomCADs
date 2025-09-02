import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslations } from './load-translations';
import { Language } from '@/types/locale';

i18n.use(initReactI18next).init({
	lng: 'en-US' satisfies Language,
	fallbackLng: 'en-US' satisfies Language,
	resources: {
		'en-US': loadTranslations('en-US'),
		'bg-BG': loadTranslations('bg-BG'),
	} satisfies Resource,
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
