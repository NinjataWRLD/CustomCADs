type Dictionary = Record<string, string>;

interface Resource {
	default: Dictionary;
}

const loadTranslations = async (lng: string) => {
	const translations: Record<string, Dictionary> = {};

	const modules: Record<string, Resource> = import.meta.glob(
		`/src/locales/**/*.json`,
		{
			eager: true,
		},
	);

	for (const path in modules) {
		const basePath = `/src/locales/${lng}/`;
		if (path.startsWith(basePath)) {
			const namespace = path
				.replace(basePath, '')
				.replace('.json', '')
				.replace(/\//g, '.');

			translations[namespace] = modules[path].default;
		}
	}

	return translations;
};

export default loadTranslations;
