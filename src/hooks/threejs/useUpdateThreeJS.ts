import { useRef } from 'react';
import * as THREE from 'three';
import { CustomizeCad, Cad } from '@/types/threejs';

export const useUpdateThreeJS = () => {
	const lastTexturesRef = useRef<Map<THREE.Object3D, string>>(new Map());

	const setNewTexture = (
		child: THREE.Mesh,
		texture: string,
		color?: string,
	) => {
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

	const updateLooks = (data: CustomizeCad, cad: Cad) => {
		const { texture, color } = data;

		cad.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const lastTexture = lastTexturesRef.current.get(child);
				if (texture !== lastTexture) {
					setNewTexture(child, texture, color);
				}

				if (color) {
					child.material.color.set(color);
				} else {
					child.material.color.setHex(0xffffff);
				}
			}
		});
	};

	return updateLooks;
};
