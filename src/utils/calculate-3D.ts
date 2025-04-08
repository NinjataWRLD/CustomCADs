import * as THREE from 'three';
import { COST, RATIO, WEIGHT } from '@/constants/threejs';
import { Cad, Ratio } from '@/types/threejs';

export const boxSize = (scene: Cad) =>
	new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());

export const getBase = (size: Ratio) => {
	const { x, y, z } = size;
	const smallest = Math.min(x, y, z);

	if (smallest === 0) return 0;
	return RATIO.base / smallest;
};

export const baseRatio = (size: Ratio) => {
	const { x, y, z } = size;
	const base = getBase(size);

	if (base === 0) return { x: 0, y: 0, z: 0 };
	return { x: base * x, y: base * y, z: base * z };
};

export const volumeMm3 = (volume: number, scale: number, size: Ratio) => {
	const scaledVolume = volume * scale ** 3;
	const base = getBase(size);

	if (base === 0) return 0;
	return scaledVolume * base ** 3;
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

export const costUSD = (weightInG: number) =>
	(weightInG / 1000) * COST.dollarPerKg * COST.profitMargin;
