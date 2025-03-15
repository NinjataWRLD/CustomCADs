import { AxiosError } from 'axios';

export const isAxiosError = (error: Error | null, status?: number) =>
	error instanceof AxiosError && (!status || error.status === status);

export const objectToSearchParams = (obj: object) =>
	new URLSearchParams(
		Object.entries(obj)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, String(value)]),
	).toString();
