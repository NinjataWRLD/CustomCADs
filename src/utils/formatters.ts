import { Mass, Distance } from '@/types/threejs';

const POINTS = 3;

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

export const percentage = (scale: number) => {
	const value = parseFloat(scale.toFixed(2));
	return `${value}%`;
};

export const size = (size: number, unit: Distance) => {
	const value = parseFloat((size / MM_PER_UNIT[unit]).toFixed(POINTS));
	return `${value} ${unit}`;
};

export const volume = (volume: number, unit: Distance) => {
	const value = parseFloat((volume / MM_PER_UNIT[unit] ** 3).toFixed(POINTS));
	return `${value} ${unit}³`;
};

export const weight = (weight: number, unit: Mass) => {
	const value = parseFloat((weight / G_PER_UNIT[unit]).toFixed(POINTS));
	return `${value} ${unit}`;
};
