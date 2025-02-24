import { Material } from '@/types/threejs';

export const INFILL = { min: 20, max: 100 };
export const SCALE = { min: 100, max: 1000 };
export const WEIGHT = { wallFactor: 45 / 100 };
export const COST = { dollarPerKg: 30, profitMargin: 1.2 };

/**
 * Calculated in g/cm3
 */
export const DENSITIES: Record<Material, number> = {
	PLA: 1.24,
	ABS: 1.04,
	'Glow in dark': 1.25,
	TUF: 1.27,
	Wood: 1.23,
};
export const MATERIALS: Material[] = [
	'PLA',
	'ABS',
	'TUF',
	'Glow in dark',
	'Wood',
];
