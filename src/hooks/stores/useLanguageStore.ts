import { useStore } from '@tanstack/react-store';
import { store } from '@/stores/language-store';

export const useLanguageStore = () => {
	const state = useStore(store);

	return state;
};
