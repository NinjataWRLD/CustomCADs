import { IDENTITY_BASE_PATH } from '../../common';

export interface Request {
	username: string;
}

export const url = (req: Request) =>
	`${IDENTITY_BASE_PATH}/email/confirm/${req.username}/retry`;
