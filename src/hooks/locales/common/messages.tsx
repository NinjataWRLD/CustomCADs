import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'messages';

export const useFetchTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.fetch`).t;

export const usePlaceholdersTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.placeholders`).t;
