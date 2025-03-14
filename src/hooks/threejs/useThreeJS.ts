import { useEffect, useRef } from 'react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Coordinates } from '@/api/catalog/common';
import initThreeJS from '@/utils/init-three-js';
import removeGLTF from '@/utils/remove-gtlf';

const useThreeJS = (
	url: string,
	coords: { cam: Coordinates; pan: Coordinates },
	loadCallback?: (cad: GLTF) => void,
	exitCallback?: VoidFunction,
) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const instanceRef = useRef<ReturnType<typeof initThreeJS> | null>(null);

	useEffect(() => {
		if (!instanceRef.current) {
			instanceRef.current = initThreeJS(mountRef.current, coords);
		}
		const { exit } = instanceRef.current ?? {};
		return () => {
			if (exitCallback) exitCallback();
			if (exit) exit();
		};
	}, []);

	useEffect(() => {
		if (instanceRef.current && url) {
			const { scene } = instanceRef.current;
			removeGLTF(scene);

			new GLTFLoader().load(url, (cad) => {
				if (loadCallback) loadCallback(cad);
				scene.add(cad.scene);
			});
		}
	}, [url]);

	return { ref: mountRef, instance: instanceRef.current };
};

export default useThreeJS;
