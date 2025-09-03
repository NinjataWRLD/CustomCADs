import { Currency } from '@/types/locale';
import * as money from '@/utils/money';
import { Store } from '@tanstack/store';

const LOCAL_STORAGE_KEY = 'currency-store';
const defaultBrowserCurrency = money.resolveCurrency();

type CurrencyState = {
	current: Currency;
};
export const defaultCurrencyState: CurrencyState = {
	current: defaultBrowserCurrency,
};

const loadInitialState = (): CurrencyState => {
	const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (persistedState) {
		return JSON.parse(persistedState);
	}

	const state = defaultCurrencyState;
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
	return state;
};

export const store = new Store<CurrencyState>(loadInitialState());
store.subscribe((state) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentVal));
});

export const resetStore = () => store.setState(defaultCurrencyState);

export const setCurrent = (currentCurr: Currency) =>
	store.setState((prev) => ({
		...prev,
		current: currentCurr,
	}));
