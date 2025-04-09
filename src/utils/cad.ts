import * as THREE from 'three';
import { Cad } from '@/types/threejs';

export const clearScene = (scene: THREE.Scene) => {
	const cads = scene.children.filter((c) => c.type === 'Group');
	if (!cads.length) return;

	scene.traverse((child) => {
		const { geometry, material } = child as THREE.Mesh;
		if (geometry) {
			geometry.dispose();
		}
		if (material) {
			if (Array.isArray(material)) {
				material.forEach((mat) => mat.dispose());
			} else {
				material.dispose();
			}
		}
	});

	cads.forEach((c) => scene.remove(c));
};

export const lockCad = (cad: Cad) => {
	const box = new THREE.Box3().setFromObject(cad);
	const center = new THREE.Vector3();
	box.getCenter(center);
	cad.position.sub(center);
};
