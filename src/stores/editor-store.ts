import { Store } from '@tanstack/store';
import { Material, Ratio } from '@/types/threejs';

const LOCAL_STORAGE_KEY = 'editor-store';
interface EditorState {
	material: Material;
	color: string;
	infill: number;
	ratio: Ratio;
	scale: number;
	volume: number;
	weight: number;
	cost: number;
}

export const defaultEditorState: EditorState = {
	material: 'PLA',
	color: '#ffffff',
	infill: 20,
	ratio: { x: 0, y: 0, z: 0 },
	scale: 100,
	volume: 0,
	weight: 0,
	cost: 0,
};

const loadInitialState = (): Record<string, EditorState> => {
	try {
		const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
		return persistedState ? JSON.parse(persistedState) : {};
	} catch {
		return {};
	}
};

const store = new Store<Record<string, EditorState>>(loadInitialState());
store.subscribe((state) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentVal));
});

export const addRecord = (id: string) =>
	store.setState((prev) => ({
		...prev,
		[id]: defaultEditorState,
	}));

export const setMaterial = (id: string, material: Material) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], material: material },
	}));

export const setColor = (id: string, color: string) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], color: color },
	}));

export const setInfill = (id: string, infill: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], infill: infill },
	}));

export const setRatio = (id: string, ratio: Ratio) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], ratio: ratio },
	}));

export const setScale = (id: string, scale: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], scale: scale },
	}));

export const setVolume = (id: string, volume: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], volume: volume },
	}));

export const setWeight = (id: string, weight: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], weight: weight },
	}));

export const setCost = (id: string, cost: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], cost: cost },
	}));

export default store;
