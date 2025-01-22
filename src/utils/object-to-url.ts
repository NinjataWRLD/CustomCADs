const func = (obj: object): string =>
	Object.entries(obj)
		.map(
			([key, value]) =>
				value &&
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
		)
		.filter((q) => q)
		.join('&');

export default func;
