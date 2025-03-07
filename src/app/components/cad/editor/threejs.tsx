import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Coordinates } from '@/api/catalog/common';
import useThreeJS from '@/hooks/threejs/useThreeJS';
import useUpdateThreeJS from '@/hooks/threejs/useUpdateThreeJS';
import calculate3D from '@/utils/calculate-3D';
import { Ratio, CustomizeCad, CalculateCad } from '@/types/threejs';
import styles from '../styles.module.css';

interface ThreeJSProps {
	url: string;
	coords: { cam: Coordinates; pan: Coordinates };
	state: {
		color?: string;
		texture: string;
		volume: number;
		density: number;
		scale: number;
		ratio: Ratio;
		infill: number;
	};
	setState: {
		setRatio: (ratio: Ratio) => void;
		setWeight: (weight: number) => void;
		setCost: (cost: number) => void;
	};
}

const EditorThreeJS = ({ url, coords, state, setState }: ThreeJSProps) => {
	const { color, texture, volume, density, scale, infill, ratio } = state;
	const { setRatio, setWeight, setCost } = setState;

	const originalScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const cadRef = useRef<GLTF>(null);
	const totalSizeRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const update = useUpdateThreeJS();

	const updateSize = () => {
		if (cadRef.current) {
			totalSizeRef.current = calculate3D.boxSize(cadRef.current.scene);
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
		}
		return { x: 0, y: 0, z: 0 } as Ratio;
	};

	const updateLooks = (data: CustomizeCad) => {
		if (cadRef.current) update(data, cadRef.current);
	};

	const updateMetrics = (data: CalculateCad) => {
		const { volume, density, scale, ratio, infill } = data;

		const volumeMm3 = calculate3D.volumeMm3(
			volume,
			scale,
			ratio,
			totalSizeRef.current,
		);

		const weight = calculate3D.weightGrams(volumeMm3, infill, density);
		setWeight(weight);

		const cost = calculate3D.costUSD(weight);
		setCost(cost);

		if (cadRef.current) {
			cadRef.current.scene.scale.copy(originalScaleRef.current);
			cadRef.current.scene.scale.multiplyScalar(scale);
		}
	};

	const { ref } = useThreeJS(url, coords, (cad) => {
		originalScaleRef.current = cad.scene.scale.clone();
		cadRef.current = cad;

		cad.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material.map = undefined;
			}
		});
		updateLooks({ texture, color });

		const ratio = updateSize();
		updateMetrics({ volume, density, ratio, scale, infill });
	});

	useEffect(() => {
		updateLooks({ texture, color });
	}, [texture, color]);

	useEffect(() => {
		updateMetrics({ volume, density, ratio, scale, infill });
	}, [volume, density, ratio, scale, infill]);

	return <div ref={ref} className={styles.model} />;
};

export default EditorThreeJS;
