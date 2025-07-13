import * as THREE from 'three';
import { COST, RATIO, WEIGHT } from '@/constants/threejs';
import { Cad, Ratio } from '@/types/threejs';

const getMinSize = (size: Ratio) => {
	if (!size.x || !size.y || !size.z) return 0;

	const { x, y, z } = {
		x: RATIO.min.x / size.x,
		y: RATIO.min.y / size.y,
		z: RATIO.min.z / size.z,
	};
	return Math.max(x, y, z);
};

export const getMaxRatio = (ratio: Ratio) => {
	const { x, y, z } = {
		x: RATIO.max.x / ratio.x,
		y: RATIO.max.y / ratio.y,
		z: RATIO.max.z / ratio.z,
	};
	return Math.min(x, y, z);
};

export const boxSize = (scene: Cad) =>
	new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());

export const baseRatio = (size: Ratio) => {
	const { x, y, z } = size;
	const base = getMinSize(size);
	return { x: base * x, y: base * y, z: base * z };
};

export const volumeMm3 = (volume: number, scale: number, size: Ratio) => {
	const scaledVolume = volume * scale ** 3;
	const min = getMinSize(size);
	return scaledVolume * min ** 3;
};

export const weightGrams = (
	volumeMm3: number,
	infill: number,
	density: number,
) => {
	const effectiveVolumeMm3 =
		volumeMm3 * (WEIGHT.wallFactor + (1 - WEIGHT.wallFactor) * infill);

	const effectiveVolumeCm3 = effectiveVolumeMm3 / 1000;
	return effectiveVolumeCm3 * density;
};

export const costEUR = (weightInG: number, euroPerKg: number) => {
	const printCost = (weightInG / 1000) * euroPerKg;
	const finalCost = printCost * COST.profitMultiplier + COST.profitBase;
	return finalCost;
};
