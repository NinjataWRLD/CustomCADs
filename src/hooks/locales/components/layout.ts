import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'layout';

export const useHeaderTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.header`).t;

export const useFooterTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.footer`).t;
