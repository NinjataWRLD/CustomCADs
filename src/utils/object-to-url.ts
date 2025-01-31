const objectToUrl = (obj: object): string =>
	Object.entries(obj)
		.filter(([, value]) => value !== undefined && value !== null)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
		)
		.join('&');

export default objectToUrl;
