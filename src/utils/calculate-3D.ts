import * as THREE from 'three';
import { Material, Mesh } from '@/types/threejs';
import { COST, DENSITIES, WEIGHT } from '@/constants/threejs';
import { calculateVolume } from './volume-calculator';

const calculate3D = {
	/**
	 * Returns in arbitrary units
	 */
	size: (scene: THREE.Group<THREE.Object3DEventMap>) =>
		new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3()),

	/**
	 * Returns in mm³
	 */
	volume: (child: Mesh) => (
		child.updateWorldMatrix(true, true), calculateVolume(child)
	),

	/**
	 * Returns in grams
	 */

	weight: (volumeMm3: number, material: Material, infill: number) => {
		const effectiveVolumeMm3 =
			volumeMm3 * (WEIGHT.wallFactor + (1 - WEIGHT.wallFactor) * infill);

		const effectiveVolumeCm3 = effectiveVolumeMm3 / 1000;
		return effectiveVolumeCm3 * DENSITIES[material];
	},

	/**
	 * Returns in USD
	 */
	cost: (weightInG: number) =>
		(weightInG / 1000) * COST.dollarPerKg * COST.profitMargin,
};

export default calculate3D;
