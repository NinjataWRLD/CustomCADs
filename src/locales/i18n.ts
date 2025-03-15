import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslations } from './load-translations';

const resources: Resource = {
	en: loadTranslations('en'),
	bg: loadTranslations('bg'),
};

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources,
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
