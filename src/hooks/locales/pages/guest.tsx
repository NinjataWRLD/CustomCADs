import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'guest';

export const usePickRoleTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.pick-role`).t;

export const useRegisterTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.register`).t;

export const useLoginTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.login`).t;
