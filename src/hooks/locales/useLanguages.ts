import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserDefaultLanguage } from '@/utils/default-language';

export const useLanguages = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		const language = localStorage.getItem('language');
		if (!language) {
			const defaultLanguage = getUserDefaultLanguage();
			if (i18n.language !== defaultLanguage)
				i18n.changeLanguage(defaultLanguage);

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
