import { useCallback, useRef } from 'react';
import IDEMPOTENCY from '@/constants/idempotency';

export const useIdempotencyKeys = <T extends readonly string[]>(names: T) => {
	const keysRef = useRef<Record<T[number], string>>(null);

	const generate = (names: T) =>
		Object.fromEntries(
			names.map((name) => [name, IDEMPOTENCY.NEW_KEY()]),
		) as Record<T[number], string>;

	keysRef.current ??= generate(names);

	const refresh = useCallback((namesToRefresh?: T) => {
		if (!namesToRefresh) {
			keysRef.current = {
				...generate(names),
			} as Record<T[number], string>;
			return;
		}

		keysRef.current = {
			...keysRef.current,
			...generate(namesToRefresh),
		} as Record<T[number], string>;
	}, []);

	return { idempotencyKeys: keysRef.current, refreshKeys: refresh };
};
