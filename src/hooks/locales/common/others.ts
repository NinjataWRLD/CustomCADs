import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

export const useOthersTranslation = () =>
	useTranslation(`${NAMESPACE}.others`).t;
