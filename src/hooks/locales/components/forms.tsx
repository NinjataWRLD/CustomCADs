import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'forms';

export const useLabelsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.labels`).t;
