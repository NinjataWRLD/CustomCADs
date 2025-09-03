import { useGetExchangeRates } from '@/hooks/queries/common';
import { fromBase } from '@/utils/money';
import { useCurrencyStore } from '../stores/useCurrencyStore';

export const useMoney = (sum: number) => {
	const { data: rates } = useGetExchangeRates();
	const { current: currency } = useCurrencyStore();

	const { money, symbol } = fromBase({ money: sum, to: currency, rates });
	return `${money.toFixed(2)} ${symbol}`;
};
