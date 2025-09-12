import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

export const useNotificationVirtualization = (
	length: number,
	onEndReached?: VoidFunction,
) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const virtualizer = useVirtualizer({
		count: length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 72,
		overscan: 5,
	});

	useEffect(() => {
		const [lastItem] = virtualizer.getVirtualItems().slice(-1);
		if (lastItem && lastItem.index >= length - 1) {
			onEndReached?.();
		}
	}, [virtualizer.getVirtualItems(), length]);

	return { virtualizer, parentRef };
};
