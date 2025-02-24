import { RefObject } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CalculateCadEvent from '@/events/calculate-cad-event';
import calculate3D from '@/utils/calculate-3D';

const useCalculateThreeJS = (
	originalScaleRef: RefObject<THREE.Vector3>,
	totalSizeRef: RefObject<THREE.Vector3>,
) => {
	const calculate = (e: CalculateCadEvent, cad: GLTF) => {
		const { material, scale, ratio, infill } = e;
		cad.scene.scale.copy(originalScaleRef.current);
		cad.scene.scale.multiplyScalar(scale);

		let volume = 0;
		cad.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				volume += calculate3D.volume(child);
			}
		});

		const multiply = (multiplier: { x: number; y: number; z: number }) =>
			multiplier.x * multiplier.y * multiplier.z;

		const scaledVolume =
			(volume * multiply(ratio)) / multiply(totalSizeRef.current);

		const weight = calculate3D.weight(scaledVolume, material, infill);
		const cost = calculate3D.cost(weight);

		return { volume: scaledVolume, weight: weight, cost: cost };
	};

	return calculate;
};

export default useCalculateThreeJS;
