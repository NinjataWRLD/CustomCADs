type Translation = Record<string, string>;
type Resources = Record<string, { default: Translation }>;

export const loadTranslations = (lng: string) => {
	const translations: Record<string, Translation> = {};

	const resources: Resources = import.meta.glob(`/src/locales/**/*.ts`, {
		eager: true,
	});

	for (const path in resources) {
		const basePath = `/src/locales/${lng}/`;
		if (path.startsWith(basePath)) {
			const namespace = path
				.replace(basePath, '')
				.replace('.ts', '')
				.replace(/\//g, '.');

			translations[namespace] = resources[path].default;
		}
	}

	return translations;
};
