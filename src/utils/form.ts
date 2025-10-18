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

export const doFieldsHaveErrors = <TValues, TKeys = keyof TValues>(
	getErrors: (field: TKeys) => { errors: unknown[] },
	onErrorFound: (field: TKeys) => void,
) => {
	const hasError = (field: TKeys) => {
		const info = getErrors(field);
		if (info?.errors) {
			onErrorFound(field);
			return true;
		}
	};

	return {
		evaluateFields: (fields: TKeys[]) =>
			fields.map(hasError).some((result) => result === true),
	};
};
