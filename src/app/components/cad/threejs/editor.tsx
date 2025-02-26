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
import { Material, Ratio } from '@/types/threejs';
import styles from './styles.module.css';

interface ThreeJSProps {
	url: string;
	cam: Coordinates;
	pan: Coordinates;
	state: {
		color?: string;
		texture: string;
		material: Material;
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

const EditorThreeJS = ({ url, cam, pan, state, setState }: ThreeJSProps) => {
	const { color, texture, material, scale, infill, ratio } = state;
	const { setRatio, setVolume, setWeight, setCost } = setState;

	const cadRef = useRef<GLTF>(null);
	const totalSizeRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const originalScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

	const updateLooks = useUpdateThreeJS();
	const calculateCad = useCalculateThreeJS(originalScaleRef, totalSizeRef);

	const updateSize = () => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling updateSize');

		const { x, y, z } = calculate3D.size(cadRef.current.scene);
		totalSizeRef.current = new THREE.Vector3(x, y, z);

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

	const updateMetrics = (e: CalculateCadEvent) => {
		if (!cadRef.current)
			throw new Error('cadRef must be set before calling updateSize');

		const calculations = calculateCad(e, cadRef.current);
		setVolume(calculations.volume);
		setWeight(calculations.weight);
		setCost(calculations.cost);

		return calculations;
	};

	const calculateHandler = (e: Event) =>
		updateMetrics(e as CalculateCadEvent);

	const customizeHandler = (e: Event) =>
		cadRef.current && updateLooks(e as CustomizeCadEvent, cadRef.current);

	const { ref } = useThreeJS(
		url,
		{ cam, pan },
		(cad) => {
			cadRef.current = cad;
			originalScaleRef.current = cad.scene.scale.clone();

			const ratio = updateSize();
			clearMaterial();

			window.addEventListener('customize-cad', customizeHandler);
			updateLooks(new CustomizeCadEvent(texture, color), cad);

			window.addEventListener('calculate-cad', calculateHandler);
			updateMetrics(
				new CalculateCadEvent(material, ratio, scale, infill),
			);
		},
		() => {
			window.removeEventListener('customize-cad', customizeHandler);
			window.removeEventListener('calculate-cad', calculateHandler);
		},
	);

	useEffect(() => {
		window.dispatchEvent(new CustomizeCadEvent(texture, color));
	}, [texture, color]);

	useEffect(() => {
		window.dispatchEvent(
			new CalculateCadEvent(material, ratio, scale, infill),
		);
	}, [material, scale, infill]);

	return <div ref={ref} className={styles.model} />;
};

export default EditorThreeJS;
