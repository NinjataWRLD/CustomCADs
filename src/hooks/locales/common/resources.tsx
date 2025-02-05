import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'resources';

export const useCategoriesTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.categories`).t;

export const useSortingsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.sortings`).t;
