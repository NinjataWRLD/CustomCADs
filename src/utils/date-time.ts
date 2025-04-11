const getUserLanguage = () => (navigator.languages || [navigator.language])[0];

interface FormatOptions {
	date: string;
	locale?: string;
}
export const format = ({ date, locale = getUserLanguage() }: FormatOptions) =>
	new Date(date).toLocaleString(locale, {
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
