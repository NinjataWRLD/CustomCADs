import { Metric } from '@/types/threejs';

const MM_PER_UNIT: Record<Metric, number> = {
	mm: 1,
	cm: 10,
	inch: 25.4,
};

const POINT_PER_UNIT: Record<Metric, number> = {
	mm: 1,
	cm: 3,
	inch: 3,
};

export const percentage = (scale: number) => {
	const value = parseFloat(scale.toFixed(2));
	return `${value}%`;
};

export const size = (size: number, metric: Metric) => {
	const value = parseFloat(
		(size / MM_PER_UNIT[metric]).toFixed(POINT_PER_UNIT[metric]),
	);
	return `${value} ${metric}`;
};

export const volume = (volume: number, metric: Metric) => {
	const value = parseFloat(
		(volume / MM_PER_UNIT[metric] ** 3).toFixed(POINT_PER_UNIT[metric]),
	);
	return `${value} ${metric}³`;
};

export const weight = (weight: number) => {
	const value = parseFloat((weight / 1000).toFixed(3));
	return `${value} kg`;
};

export const cost = (cost: number, currency: string) => {
	const value = parseFloat(cost.toFixed(2));
	return `${value}${currency}`;
};
