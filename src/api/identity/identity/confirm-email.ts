import { IDENTITY_BASE_PATH } from '@/api/identity/common';

export type Request = {
	username: string;
	token: string;
};

export const url = () => `${IDENTITY_BASE_PATH}/email/confirm`;
