import { useStore } from '@tanstack/react-store';
import editorStore, {
	addRecord,
	defaultEditorState,
} from '@/stores/editor-store';

const useEditorStore = (id: string) => {
	const store = useStore(editorStore, (store) => {
		if (!store[id]) {
			addRecord(id);
		}
		return store[id] ?? defaultEditorState;
	});

	return store;
};

export default useEditorStore;
