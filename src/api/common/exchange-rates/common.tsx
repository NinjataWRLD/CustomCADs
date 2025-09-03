import { Currency } from '@/types/locale';

export type ExchangeRate = {
	date: string;
	currency: Currency;
	rate: number;
};
