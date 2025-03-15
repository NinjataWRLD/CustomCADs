/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { Translations } from '@/locales/types';

const useTranslation = <T extends keyof Translations>(namespace: T) => {
	const { t } = useI18nextTranslation(namespace);

	return {
		t: (key: keyof Translations[T], options?: any) =>
			t(key as string, options) as string,
	};
};

export default useTranslation;
