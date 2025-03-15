import { SIGNIN_BASE_PATH } from '../../common';

export interface Request {
	email: string;
}

export const url = (req: Request) =>
	`${SIGNIN_BASE_PATH}/password/forgot/${req.email}`;
