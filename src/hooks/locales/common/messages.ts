import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'messages';

export const usePlaceholdersTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.placeholders`).t;

export const useNotFoundTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.not-found`).t;
