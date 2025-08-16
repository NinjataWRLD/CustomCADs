import { useTranslation } from '../useTranslation';
import { NAMESPACE } from './namespace';

const SUB_NAMESPACE = 'guest';

export const usePickRoleTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.pick-role`).t;

export const useRegisterTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.register`).t;

export const useConfirmEmailTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.confirm-email`).t;

export const useRetryConfirmEmailTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.retry-confirm-email`).t;

export const useLoginTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.login`).t;

export const useForgotPasswordTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.forgot-password`).t;

export const useResetPasswordTranslation = () =>
	useTranslation(`${NAMESPACE}.${SUB_NAMESPACE}.reset-password`).t;
