import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import { useUpdateThreeJS } from '@/hooks/threejs/useUpdateThreeJS';
import * as calculate3D from '@/utils/calculate-3D';
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
		size: Ratio;
		infill: number;
	};
	setState: {
		setSize: (size: Ratio) => void;
		setWeight: (weight: number) => void;
		setCost: (cost: number) => void;
	};
}

const EditorThreeJS = ({ url, coords, state, setState }: ThreeJSProps) => {
	const { color, texture, volume, density, scale, infill, size } = state;
	const { setSize, setWeight, setCost } = setState;

	const originalScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const cadRef = useRef<GLTF>(null);
	const update = useUpdateThreeJS();

	const updateLooks = (data: CustomizeCad) => {
		if (cadRef.current) update(data, cadRef.current);
	};

	const updateMetrics = (data: CalculateCad) => {
		const { volume, density, scale, size, infill } = data;
		const volumeMm3 = calculate3D.volumeMm3(volume, scale, size);

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

		const size = calculate3D.boxSize(cadRef.current.scene);
		setSize(size);

		updateMetrics({ volume, density, size, scale, infill });
	});

	useEffect(() => {
		updateLooks({ texture, color });
	}, [texture, color]);

	useEffect(() => {
		updateMetrics({ volume, density, size, scale, infill });
	}, [volume, density, size, scale, infill]);

	return <div ref={ref} className={styles.model} />;
};

export default EditorThreeJS;
