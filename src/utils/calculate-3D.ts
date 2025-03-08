import * as THREE from 'three';
import { COST, RATIO, WEIGHT } from '@/constants/threejs';
import { Ratio } from '@/types/threejs';

const calculate3D = {
	boxSize: (scene: THREE.Group<THREE.Object3DEventMap>) =>
		new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3()),

	getBase: (size: Ratio) => {
		const { x, y, z } = size;
		const smallest = Math.min(x, y, z);

		if (smallest === 0) return 0;
		return RATIO.base / smallest;
	},

	baseRatio: (size: Ratio) => {
		const { x, y, z } = size;
		const base = calculate3D.getBase(size);

		if (base === 0) return { x: 0, y: 0, z: 0 };
		return { x: base * x, y: base * y, z: base * z };
	},

	volumeMm3: (volume: number, scale: number, size: Ratio) => {
		const scaledVolume = volume * scale ** 3;
		const base = calculate3D.getBase(size);

		if (base === 0) return 0;
		return scaledVolume * base ** 3;
	},

	weightGrams: (volumeMm3: number, infill: number, density: number) => {
		const effectiveVolumeMm3 =
			volumeMm3 * (WEIGHT.wallFactor + (1 - WEIGHT.wallFactor) * infill);

		const effectiveVolumeCm3 = effectiveVolumeMm3 / 1000;
		return effectiveVolumeCm3 * density;
	},

	costUSD: (weightInG: number) =>
		(weightInG / 1000) * COST.dollarPerKg * COST.profitMargin,
};

export default calculate3D;
