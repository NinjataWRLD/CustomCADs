import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import { useUpdateThreeJS } from '@/hooks/threejs/useUpdateThreeJS';
import * as calculate3D from '@/utils/calculate-3D';
import { Ratio, CustomizeCad, CalculateCad, Cad } from '@/types/threejs';

interface ThreeJSProps {
	file: { url: string; type: string };
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

const EditorThreeJS = ({ file, coords, state, setState }: ThreeJSProps) => {
	const { color, texture, volume, density, scale, infill, size } = state;
	const { setSize, setWeight, setCost } = setState;

	const originalScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
	const cadRef = useRef<Cad>(null);
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
			cadRef.current.scale.copy(originalScaleRef.current);
			cadRef.current.scale.multiplyScalar(scale);
		}
	};

	const { ref } = useThreeJS(file.url, file.type, coords, (cad) => {
		originalScaleRef.current = cad.scale.clone();
		cadRef.current = cad;

		cad.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material.map = undefined;
			}
		});
		updateLooks({ texture, color });

		const size = calculate3D.boxSize(cadRef.current);
		setSize(size);

		updateMetrics({ volume, density, size, scale, infill });
	});

	useEffect(() => {
		updateLooks({ texture, color });
	}, [texture, color]);

	useEffect(() => {
		updateMetrics({ volume, density, size, scale, infill });
	}, [volume, density, size, scale, infill]);

	return <div ref={ref} className='h-full w-full' />;
};

export default EditorThreeJS;
