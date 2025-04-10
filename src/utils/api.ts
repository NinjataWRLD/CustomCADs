export const objectToSearchParams = (obj: object) =>
	new URLSearchParams(
		Object.entries(obj)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, String(value)]),
	).toString();
