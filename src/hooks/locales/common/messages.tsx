import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'messages';

export const useFetchTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.fetch`).t;

export const usePlaceholdersTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.placeholders`).t;
