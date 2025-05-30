import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguages = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		const language = localStorage.getItem('language');
		if (!language) {
			localStorage.setItem('language', i18n.language);
		} else if (i18n.language !== language) {
			i18n.changeLanguage(language);
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem('language') !== i18n.language) {
			localStorage.setItem('language', i18n.language);
		}
	}, [i18n.language]);

	return i18n.language;
};
