import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useLanguages = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		const language = localStorage.getItem('language');
		if (!language) {
			localStorage.setItem('language', i18n.language);
		} else if (i18n.language !== language) {
			i18n.changeLanguage(language);
			localStorage.setItem('language', language);
		}
	}, [i18n]);

	return i18n.language;
};

export default useLanguages;
