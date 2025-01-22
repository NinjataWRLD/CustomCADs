export interface Request {
	id: string;
}

export type Response = Record<string, { message: string; place: string }>;
