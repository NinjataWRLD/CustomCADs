import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

export const useLocalesTranslation = () =>
	useTranslation(`${NAMESPACE}.locales`).t;
