import { AxiosError } from 'axios';

const isError = (error: Error | null, status?: number) =>
	error instanceof AxiosError && (!status || error.status === status);

export default isError;
