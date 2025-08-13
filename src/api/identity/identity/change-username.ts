import { IDENTITY_BASE_PATH } from '../common';

export type Request = {
	username: string;
};

export const url = () => `${IDENTITY_BASE_PATH}/username`;
