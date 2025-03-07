import { useEffect, useRef, useState } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import useThreeJS from '@/hooks/threejs/useThreeJS';
import { calculateCadVolume } from '@/utils/volume-calculator';

const emptyCoords = { x: 0, y: 0, z: 0 };

const useCalculateVolume = (cad: File | null) => {
	const cadRef = useRef<GLTF | null>(null);
	const blobUrl = cad ? URL.createObjectURL(cad) : '';

	const [volume, setVolume] = useState<number | null>(null);
	const updateVolume = () => {
		if (cadRef.current) {
			setVolume(calculateCadVolume(cadRef.current));
		}
	};

	const { ref } = useThreeJS(
		blobUrl,
		{ cam: emptyCoords, pan: emptyCoords },
		(cad) => {
			cadRef.current = cad;
			updateVolume();
		},
	);

	useEffect(() => {
		updateVolume();
	}, [blobUrl]);

	return { volume, ref };
};

export default useCalculateVolume;
