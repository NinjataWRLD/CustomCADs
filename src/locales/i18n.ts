import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslations } from './load-translations';
import { ALLOWED_LANGUAGES, Language } from '@/types/locale';

const resources = ALLOWED_LANGUAGES.reduce<Resource>((acc, lang) => {
	acc[lang] = loadTranslations(lang);
	return acc;
}, {});

i18n.use(initReactI18next).init({
	lng: 'en-GB' satisfies Language,
	fallbackLng: 'en-GB' satisfies Language,
	resources: resources satisfies Resource,
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
