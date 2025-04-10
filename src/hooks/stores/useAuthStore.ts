import { useMemo } from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '@/stores/auth-store';
import * as auth from '@/utils/auth';

export const useAuthStore = () => {
	const state = useStore(store);
	const is = useMemo(() => auth.is(state), [state]);
	return { ...state, is };
};
