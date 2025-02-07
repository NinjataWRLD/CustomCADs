import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'guest';

export const usePickRoleTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.pick-role`).t;
