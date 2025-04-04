import { useEffect, useRef } from 'react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Coordinates } from '@/api/catalog/common';
import { initThreeJS } from '@/utils/init-three-js';
import { lockGLTF, removeGLTF } from '@/utils/gltf';

export const useThreeJS = (
	url: string,
	coords: { cam: Coordinates; pan: Coordinates },
	loadCallback?: (cad: GLTF) => void,
	exitCallback?: VoidFunction,
) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const instanceRef = useRef<ReturnType<typeof initThreeJS> | null>(null);

	useEffect(() => {
		if (url && !instanceRef.current) {
			instanceRef.current = initThreeJS(mountRef.current, coords);
		}
		return () => {
			if (exitCallback) exitCallback();

			const { exit } = instanceRef.current ?? {};
			if (exit) exit();
		};
	}, [url]);

	useEffect(() => {
		if (instanceRef.current && url) {
			const { scene } = instanceRef.current;
			removeGLTF(scene);

			new GLTFLoader().load(url, (cad) => {
				lockGLTF(cad);
				if (loadCallback) loadCallback(cad);
				scene.add(cad.scene);
			});
		}
	}, [url]);

	return { ref: mountRef, instance: instanceRef.current };
};
