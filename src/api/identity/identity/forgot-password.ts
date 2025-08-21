import { IDENTITY_BASE_PATH } from '../common';

export type Request = {
	email: string;
};

export const url = () => `${IDENTITY_BASE_PATH}/password/forgot`;
