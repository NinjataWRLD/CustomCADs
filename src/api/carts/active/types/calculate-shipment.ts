import { Calculation } from '@/api/common/calculation';

export interface Request {
	country: string;
	city: string;
}

export type Response = Calculation;
