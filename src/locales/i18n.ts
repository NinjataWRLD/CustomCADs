import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import loadTranslations from './load-translations';

const init = async () => {
	const resources: Resource = {
		en: await loadTranslations('en'),
		bg: await loadTranslations('bg'),
	};

	i18n.use(initReactI18next).init({
		lng: 'en',
		fallbackLng: 'en',
		resources,
		interpolation: {
			escapeValue: false,
		},
	});
};
init();

export default i18n;
