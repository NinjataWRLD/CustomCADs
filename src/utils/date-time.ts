import { getUserDefaultLanguage } from './default-language';

interface FormatOptions {
	date: string;
	locale?: string;
	dateOnly?: boolean;
}
export const format = ({
	date,
	locale = getUserDefaultLanguage(),
	dateOnly = false,
}: FormatOptions) =>
	new Date(date).toLocaleString(locale, {
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: dateOnly ? undefined : '2-digit',
		minute: dateOnly ? undefined : '2-digit',
		second: dateOnly ? undefined : '2-digit',
	});
