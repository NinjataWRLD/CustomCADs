const getBrowserDefaultLangauge = () =>
	(navigator.languages || [navigator.language])[0];

export const getUserDefaultLanguage = getBrowserDefaultLangauge;
