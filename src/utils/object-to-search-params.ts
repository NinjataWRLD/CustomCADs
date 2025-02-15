const objectToSearchParams = (obj: Record<string, unknown>) =>
	new URLSearchParams(
		Object.entries(obj)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, String(value)]),
	).toString();

export default objectToSearchParams;
