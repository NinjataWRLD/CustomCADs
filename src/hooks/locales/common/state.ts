import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'state';

export const useErrorTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.error`).t;
