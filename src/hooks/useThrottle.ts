import { useEffect } from 'react';
import { useThrottledValue } from '@tanstack/react-pacer';

export const useThrottle = <T>(value: T, delay: number): T => {
	const [throttledValue, throttler] = useThrottledValue(value, {
		wait: delay,
	});

	useEffect(() => {
		throttler.maybeExecute(value);
	}, [value]);

	return throttledValue;
};
