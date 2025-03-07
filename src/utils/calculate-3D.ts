import * as THREE from 'three';
import { COST, WEIGHT } from '@/constants/threejs';
import { Ratio } from '@/types/threejs';

const calculate3D = {
	boxSize: (scene: THREE.Group<THREE.Object3DEventMap>) =>
		new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3()),

	multiplyDimensions: (dimensions: { x: number; y: number; z: number }) =>
		dimensions.x * dimensions.y * dimensions.z,

	volumeMm3: (volume: number, scale: number, ratio: Ratio, size: Ratio) => {
		const scaledVolume = volume * scale ** 3;

		const scaledVolumeMm3 =
			(scaledVolume * calculate3D.multiplyDimensions(ratio)) /
			calculate3D.multiplyDimensions(size);

		return scaledVolumeMm3;
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
