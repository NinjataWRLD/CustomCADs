import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

export const useOthersTranslation = () =>
	useTranslation(`${NAMESPACE}.others`).t;
