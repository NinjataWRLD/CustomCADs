type Locale = 'default' | 'bg-BG';
type Currency = 'EUR' | 'BGN';

const currencies: Record<Locale, Currency> = {
	default: 'EUR',
	'bg-BG': 'BGN',
};
const isLocale = (l: string): l is Locale => l in currencies;

const rates: Record<Currency, { conversion: number; symbol: string }> = {
	EUR: { conversion: 1, symbol: '€' },
	BGN: { conversion: 1.9558, symbol: 'лв' },
};

const getLocale = (): Locale => {
	const [preferredLng] = navigator.languages || [navigator.language];
	if (isLocale(preferredLng)) return preferredLng;

	const [language] = preferredLng.split('-');
	if (language === 'bg') {
		return 'bg-BG';
	}

	return 'default';
};

interface FromBaseOptions {
	money?: number;
	to?: string;
}
export const fromBase = ({ money = 0, to = getLocale() }: FromBaseOptions) => {
	const currency = currencies[isLocale(to) ? to : 'default'];
	const { conversion, symbol } = rates[currency];
	return { money: money * conversion, symbol };
};

interface ToBaseOptions {
	money: number;
	from?: string;
}
export const toBase = ({ money, from = getLocale() }: ToBaseOptions) => {
	const currency = currencies[isLocale(from) ? from : 'default'];
	const { conversion } = rates[currency];
	return money / conversion;
};

interface FormatProps {
	money: number;
	symbol: string;
}
export const format = ({ money, symbol }: FormatProps) =>
	`${money.toFixed(2)}${symbol}`;
