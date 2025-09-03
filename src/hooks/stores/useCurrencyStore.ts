import { useStore } from '@tanstack/react-store';
import { store } from '@/stores/currency-store';

export const useCurrencyStore = () => {
	const state = useStore(store);

	return state;
};
