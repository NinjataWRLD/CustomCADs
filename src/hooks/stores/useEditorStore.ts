import { useStore } from '@tanstack/react-store';
import { store, addRecord, defaultEditorState } from '@/stores/editor-store';

export const useEditorStore = (id: string) => {
	const state = useStore(store, (store) => {
		if (!store[id]) {
			addRecord(id);
		}
		return store[id] ?? defaultEditorState;
	});

	return state;
};
