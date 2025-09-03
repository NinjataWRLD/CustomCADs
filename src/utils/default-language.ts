import { Language } from '@/types/locale';

const getBrowserDefaultLangauge = () =>
	(navigator.languages || [navigator.language])[0] as Language;

export const getUserDefaultLanguage = getBrowserDefaultLangauge;
