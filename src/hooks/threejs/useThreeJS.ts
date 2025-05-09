import { useEffect, useRef } from 'react';
import { Cad } from '@/types/threejs';
import { Coordinates } from '@/api/catalog/common';
import { initThreeJS } from '@/utils/init-three-js';
import { clearScene } from '@/utils/cad';
import * as loader from '@/utils/loader';

export const useThreeJS = (
	url: string,
	type: string,
	coords: { cam: Coordinates; pan: Coordinates },
	loadCallback?: (cad: Cad) => void,
) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const instanceRef = useRef<ReturnType<typeof initThreeJS> | null>(null);

	useEffect(() => {
		if (url && !instanceRef.current) {
			instanceRef.current = initThreeJS(mountRef.current, coords);
		}
		return () => {
			instanceRef.current?.exit();
			instanceRef.current = null;
		};
	}, [url]);

	useEffect(() => {
		if (instanceRef.current && url) {
			const { scene } = instanceRef.current;
			clearScene(scene);

			if (type === 'glb' || type === 'gltf') {
				loader.gltf(scene, url, loadCallback);
			} else if (type === 'stl') {
				loader.stl(scene, url, loadCallback);
			}
		}
	}, [url]);

	return { ref: mountRef, instance: instanceRef.current };
};
