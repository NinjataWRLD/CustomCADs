const getTimezone = (): string =>
	Intl.DateTimeFormat().resolvedOptions().timeZone;

export default getTimezone;
