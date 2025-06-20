import { Mass, Distance } from '@/types/threejs';

const MM_PER_UNIT: Record<Distance, number> = {
	mm: 1,
	cm: 10,
	inch: 25.4,
};

const G_PER_UNIT: Record<Mass, number> = {
	g: 1,
	kg: 1000,
	lbs: 453.59237,
};

const POINT_PER_UNIT: Record<Distance | Mass, number> = {
	mm: 1,
	cm: 3,
	inch: 3,
	g: 1,
	kg: 3,
	lbs: 3,
};

export const percentage = (scale: number) => {
	const value = parseFloat(scale.toFixed(2));
	return `${value}%`;
};

export const size = (size: number, unit: Distance) => {
	const value = parseFloat(
		(size / MM_PER_UNIT[unit]).toFixed(POINT_PER_UNIT[unit]),
	);
	return `${value} ${unit}`;
};

export const volume = (volume: number, unit: Distance) => {
	const value = parseFloat(
		(volume / MM_PER_UNIT[unit] ** 3).toFixed(POINT_PER_UNIT[unit]),
	);
	return `${value} ${unit}³`;
};

export const weight = (weight: number, unit: Mass) => {
	const value = parseFloat(
		(weight / G_PER_UNIT[unit]).toFixed(POINT_PER_UNIT[unit]),
	);
	return `${value} ${unit}`;
};
