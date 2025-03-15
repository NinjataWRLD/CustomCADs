import useTranslation from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'forms';

export const useLabelsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.labels`).t;

export const useErrorsTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.errors`).t;
