import { SIGNUP_BASE_PATH } from '../../common';

export interface Request {
	username: string;
}

export const url = (req: Request) =>
	`${SIGNUP_BASE_PATH}/email/confirm/${req.username}/retry`;
