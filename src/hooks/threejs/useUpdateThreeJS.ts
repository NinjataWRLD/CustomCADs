import { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from '@/types/threejs';
import CustomizeCadEvent from '@/events/customize-cad-event';

const useUpdateThreeJS = () => {
	const lastTexturesRef = useRef<Map<THREE.Object3D, string>>(new Map());

	const setNewTexture = (child: Mesh, texture: string, color?: string) => {
		lastTexturesRef.current.set(child, texture);

		const loader = new THREE.TextureLoader();
		if (color) {
			child.material = new THREE.MeshStandardMaterial({
				map: loader.load(texture),
				color: color,
			});
		} else {
			child.material = new THREE.MeshStandardMaterial({
				map: loader.load(texture),
			});
		}
	};

	const updateColor = (child: Mesh, color?: string) => {
		if (color) {
			child.material.color.set(color);
		} else {
			child.material.color.setHex(0xffffff);
		}
	};

	const updateLooks = (event: CustomizeCadEvent, cad: GLTF) => {
		const { texture, color } = event;

		cad.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const lastTexture = lastTexturesRef.current.get(child);
				if (texture) {
					if (texture !== lastTexture) {
						setNewTexture(child, texture, color);
					}
				}
				updateColor(child, color);
			}
		});
	};

	return updateLooks;
};

export default useUpdateThreeJS;
