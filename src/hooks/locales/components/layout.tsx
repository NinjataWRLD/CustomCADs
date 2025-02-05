import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'layout';

export const useHeaderTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.header`).t;

export const useFooterTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.footer`).t;
