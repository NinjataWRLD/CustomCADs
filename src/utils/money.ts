import { Currency, EXCHANGE_RATES } from '@/types/locale';
import { getUserDefaultLanguage } from './default-language';
import { ExchangeRate } from '@/api/common/exchange-rates/common';
import { invertBy } from './ts-utils';

const currencies = invertBy(EXCHANGE_RATES, 'language');
const { EUR } = EXCHANGE_RATES;

const currencyToRate = (rates: ExchangeRate[], currency: Currency) => {
	const rate = rates.find((x) => x.currency === currency);
	if (!rate) return rate;

	return {
		rate: rate.rate,
		symbol: EXCHANGE_RATES[currency].symbol,
	};
};

export const resolveCurrency = (currency?: Currency) =>
	currency ?? currencies[getUserDefaultLanguage()] ?? 'EUR';

export const currencyToSymbol = (currency?: Currency) =>
	EXCHANGE_RATES[resolveCurrency(currency)].symbol;

type FromBaseOptions = { money: number; to?: Currency; rates?: ExchangeRate[] };
export const fromBase = ({ money, to, rates }: FromBaseOptions) => {
	to = resolveCurrency(to);
	if (rates) {
		const { rate, symbol } = currencyToRate(rates, to) ?? EUR;
		return { money: money * rate, symbol };
	}

	const { rate, symbol } = EXCHANGE_RATES[to];
	return { money: money * rate, symbol };
};

type ToBaseOptions = { money: number; from?: Currency; rates?: ExchangeRate[] };
export const toBase = ({ money, from, rates }: ToBaseOptions) => {
	from = resolveCurrency(from);
	if (rates) {
		const { rate } = currencyToRate(rates, from) ?? EUR;
		return { money: money / rate, symbol: EUR.symbol };
	}

	const { rate } = EXCHANGE_RATES[from];
	return { money: money / rate, symbol: EUR.symbol };
};
