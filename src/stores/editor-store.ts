import { Store } from '@tanstack/store';
import { Ratio } from '@/types/threejs';

const LOCAL_STORAGE_KEY = 'editor-store';
interface EditorState {
	materialId: number;
	color: string;
	infill: number;
	size: Ratio;
	scale: number;
	weight: number;
	cost: number;
}

export const defaultEditorState: EditorState = {
	materialId: 1,
	color: '#ffffff',
	infill: 20,
	size: { x: 0, y: 0, z: 0 },
	scale: 100,
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

export const resetStore = (id: string) =>
	store.setState((prev) => ({
		...prev,
		[id]: defaultEditorState,
	}));

export const addRecord = (id: string) =>
	store.setState((prev) => ({
		...prev,
		[id]: defaultEditorState,
	}));

export const removeRecord = (id: string) =>
	store.setState((prev) =>
		Object.fromEntries(Object.entries(prev).filter((x) => x[0] !== id)),
	);

export const setMaterialId = (id: string, materialId: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], materialId: materialId },
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

export const setSize = (id: string, size: Ratio) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], size: size },
	}));

export const setScale = (id: string, scale: number) =>
	store.setState((prev) => ({
		...prev,
		[id]: { ...prev[id], scale: scale },
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
