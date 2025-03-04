import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Coordinates } from '@/api/catalog/common';
import useThreeJS from '@/hooks/threejs/useThreeJS';
import useUpdateThreeJS from '@/hooks/threejs/useUpdateThreeJS';
import useCalculateThreeJS from '@/hooks/threejs/useCalculateThreeJS';
import CustomizeCadEvent from '@/events/customize-cad-event';
import CalculateCadEvent from '@/events/calculate-cad-event';
import calculate3D from '@/utils/calculate-3D';
import { Ratio } from '@/types/threejs';
import styles from '../styles.module.css';

interface ThreeJSProps {
	url: string;
	coords: { cam: Coordinates; pan: Coordinates };
	state: {
		color?: string;
		texture: string;
		density: number;
		scale: number;
		ratio: Ratio;
		infill: number;
	};
	setState: {
		setRatio: (ratio: Ratio) => void;
		setVolume: (volume: number) => void;
		setWeight: (weight: number) => void;
		setCost: (cost: number) => void;
	};
}

const EditorThreeJS = ({ url, coords, state, setState }: ThreeJSProps) => {
	const { color, texture, density, scale, infill, ratio } = state;
	const { setRatio, setVolume, setWeight, setCost } = setState;

	const cadRef = useRef<GLTF>(null);
	const totalSizeRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const originalScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

	const update = useUpdateThreeJS();
	const calculate = useCalculateThreeJS(originalScaleRef, totalSizeRef);

	const updateSize = () => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling updateSize');

		totalSizeRef.current = calculate3D.size(cadRef.current.scene);
		const { x, y, z } = totalSizeRef.current;

		const base = 35;
		const smallest = Math.min(x, y, z);

		const ratio: Ratio = {
			x: (base * x) / smallest,
			y: (base * y) / smallest,
			z: (base * z) / smallest,
		};
		setRatio(ratio);
		return ratio;
	};

	const clearMaterial = () => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling clearMaterial');

		cadRef.current.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material.map = undefined;
			}
		});
	};

	const updateLooks = (e: CustomizeCadEvent) => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling updateLooks');

		update(e, cadRef.current);
	};
	const updateHandler = (e: Event) => updateLooks(e as CustomizeCadEvent);

	const updateMetrics = (e: CalculateCadEvent) => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling updateMetrics');

		const calculations = calculate(e, cadRef.current);
		setVolume(calculations.volume);
		setWeight(calculations.weight);
		setCost(calculations.cost);
	};
	const calculateHandler = (e: Event) =>
		updateMetrics(e as CalculateCadEvent);

	const { ref } = useThreeJS(
		url,
		coords,
		(cad) => {
			cadRef.current = cad;
			originalScaleRef.current = cad.scene.scale.clone();

			const ratio = updateSize();
			clearMaterial();
			window.addEventListener('customize-cad', updateHandler);
			updateHandler(new CustomizeCadEvent(texture, color));

			window.addEventListener('calculate-cad', calculateHandler);
			calculateHandler(
				new CalculateCadEvent(density, ratio, scale, infill),
			);
		},
		() => {
			window.removeEventListener('customize-cad', updateHandler);
			window.removeEventListener('calculate-cad', calculateHandler);
		},
	);

	useEffect(() => {
		window.dispatchEvent(new CustomizeCadEvent(texture, color));
	}, [texture, color]);

	useEffect(() => {
		window.dispatchEvent(
			new CalculateCadEvent(density, ratio, scale, infill),
		);
	}, [density, scale, infill]);

	return <div ref={ref} className={styles.model} />;
};

export default EditorThreeJS;
