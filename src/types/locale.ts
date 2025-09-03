export const EXCHANGE_RATES = {
	EUR: { rate: 1, symbol: '€', language: '' },
	USD: { rate: 1.1646, symbol: '$', language: 'en-US' },
	JPY: { rate: 173.1, symbol: '¥', language: 'ja-JP' },
	BGN: { rate: 1.9558, symbol: 'лв', language: 'bg-BG' },
	CZK: { rate: 24.485, symbol: 'Kč', language: 'cs-CZ' },
	DKK: { rate: 7.4632, symbol: 'kr', language: 'da-DK' },
	GBP: { rate: 0.8702, symbol: '£', language: 'en-GB' },
	HUF: { rate: 395.58, symbol: 'Ft', language: 'hu-HU' },
	PLN: { rate: 4.2653, symbol: 'zł', language: 'pl-PL' },
	RON: { rate: 5.0822, symbol: 'lei', language: 'ro-RO' },
	SEK: { rate: 11.003, symbol: 'kr', language: 'sv-SE' },
	CHF: { rate: 0.9366, symbol: 'CHF', language: 'fr-CH' },
	ISK: { rate: 143.6, symbol: 'Íkr', language: 'is-IS' },
	NOK: { rate: 11.674, symbol: 'kr', language: 'no-NO' },
	TRY: { rate: 47.9289, symbol: '₺', language: 'tr-TR' },
	AUD: { rate: 1.7897, symbol: 'A$', language: 'en-AU' },
	BRL: { rate: 6.3757, symbol: 'R$', language: 'pt-BR' },
	CAD: { rate: 1.6056, symbol: 'CA$', language: 'en-CA' },
	CNY: { rate: 8.3202, symbol: '¥', language: 'zh-CN' },
	HKD: { rate: 9.0915, symbol: 'HK$', language: 'zh-HK' },
	IDR: { rate: 19110.27, symbol: 'Rp', language: 'id-ID' },
	ILS: { rate: 3.9478, symbol: '₪', language: 'he-IL' },
	INR: { rate: 102.5795, symbol: '₹', language: 'hi-IN' },
	KRW: { rate: 1625.01, symbol: '₩', language: 'ko-KR' },
	MXN: { rate: 21.8726, symbol: '$', language: 'es-MX' },
	MYR: { rate: 4.9263, symbol: 'RM', language: 'ms-MY' },
	NZD: { rate: 1.9892, symbol: '$', language: 'en-NZ' },
	PHP: { rate: 66.762, symbol: '₱', language: 'fil-PH' },
	SGD: { rate: 1.5006, symbol: 'S$', language: 'en-SG' },
	THB: { rate: 37.704, symbol: '฿', language: 'th-TH' },
	ZAR: { rate: 20.6439, symbol: 'R', language: 'en-ZA' },
} as const;

export type Currency = keyof typeof EXCHANGE_RATES;
export const CURRENCIES = Object.keys(EXCHANGE_RATES) as Currency[];

type Rates = {
	[C in Currency]: (typeof EXCHANGE_RATES)[C]['rate'];
};
export type Rate = Rates[Currency];
export const RATES: Rates = Object.fromEntries(
	Object.entries(EXCHANGE_RATES).map(([k, v]) => [k, v.rate]),
) as never;

type Symbols = {
	[C in Currency]: (typeof EXCHANGE_RATES)[C]['symbol'];
};
export type Symbol = Symbols[Currency];
export const SYMBOLS: Symbols = Object.fromEntries(
	Object.entries(EXCHANGE_RATES).map(([k, v]) => [k, v.symbol]),
) as never;

type Languages = {
	[C in Currency]: (typeof EXCHANGE_RATES)[C]['language'];
};
export type Language = Languages[Currency];

export const ALLOWED_LANGUAGES: Language[] = ['en-GB', 'bg-BG'];
export const LANGUAGES: Languages = Object.fromEntries(
	Object.entries(EXCHANGE_RATES).map(([k, v]) => [k, v.language]),
) as never;
