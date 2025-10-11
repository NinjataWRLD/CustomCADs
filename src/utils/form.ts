export const equalityHelper = () => {
	let holder = '';

	const sync = (x: string) => {
		holder = x;
		return true;
	};

	const check = (x: string) => {
		return holder === x;
	};

	return { sync, check };
};

export const fileHelper = (file: File) => file.size > 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractError = (error: any) =>
	error?.response?.data?.detail as string;
