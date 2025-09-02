import { Language } from '@/types/locale';
import { getUserDefaultLanguage } from '@/utils/default-language';
import { Store } from '@tanstack/store';

const LOCAL_STORAGE_KEY = 'language-store';
const defaultBrowserLanguage = getUserDefaultLanguage();

type LanguageState = {
	default: Language;
	current: Language;
};
export const defaultEditorState: LanguageState = {
	default: defaultBrowserLanguage,
	current: defaultBrowserLanguage,
};

const loadInitialState = (): LanguageState => {
	const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (persistedState) {
		return JSON.parse(persistedState);
	}

	const state = defaultEditorState;
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
	return state;
};

export const store = new Store<LanguageState>(loadInitialState());
store.subscribe((state) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentVal));
});

export const resetStore = () => store.setState(defaultEditorState);

export const setDefault = (defaultLang: Language) =>
	store.setState((prev) => ({
		...prev,
		default: defaultLang,
	}));

export const setCurrent = (currentLang: Language) =>
	store.setState((prev) => ({
		...prev,
		current: currentLang,
	}));
