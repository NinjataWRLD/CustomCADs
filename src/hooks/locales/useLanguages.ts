import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/types/locale';
import * as languageStore from '@/stores/language-store';
import { useLanguageStore } from '@/hooks/stores/useLanguageStore';

export const useLanguages = () => {
	const { i18n } = useTranslation();
	const language = useLanguageStore();

	const updateI18n = () => i18n.changeLanguage(language.current);

	const updateStore = () =>
		languageStore.setCurrent(i18n.language as Language);

	useEffect(() => {
		if (i18n.language !== language.current) {
			updateI18n();
		}
	}, []);

	useEffect(() => {
		if (i18n.language !== language.current) updateI18n();
	}, [language.current]);

	useEffect(() => {
		if (i18n.language !== language.current) updateStore();
	}, [i18n.language]);

	return i18n.language;
};
