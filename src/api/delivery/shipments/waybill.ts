import { SHIPMENTS_BASE_PATH } from '../common';

export interface Request {
	id: string;
}

export const url = (req: Request) => `${SHIPMENTS_BASE_PATH}/${req.id}/waybill`;
