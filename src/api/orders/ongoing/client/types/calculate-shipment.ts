import { Calculation } from '@/api/common/calculation';

export interface Request {
	id: string;
	count: number;
	weight: number;
	country: string;
	city: string;
}

export type Response = Calculation;
