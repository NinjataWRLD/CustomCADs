import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from '@/types/threejs';

const calculateMeshVolume = (mesh: Mesh) => {
	let sum = 0;
	const {
		matrixWorld,
		geometry: {
			index,
			attributes: { position },
		},
	} = mesh;

	const v1 = new THREE.Vector3();
	const v2 = new THREE.Vector3();
	const v3 = new THREE.Vector3();
	const edge1 = new THREE.Vector3();
	const edge2 = new THREE.Vector3();
	const cross = new THREE.Vector3();
	const centroid = new THREE.Vector3();
	const ONE_THIRD = 1 / 3;

	const getIndex = (i: number) => (index ? index.getX(i) : i);
	const count = index ? index.count : position.count;

	for (let i = 0; i < count; i += 3) {
		v1.fromBufferAttribute(position, getIndex(i)).applyMatrix4(matrixWorld);
		v2.fromBufferAttribute(position, getIndex(i + 1)).applyMatrix4(
			matrixWorld,
		);
		v3.fromBufferAttribute(position, getIndex(i + 2)).applyMatrix4(
			matrixWorld,
		);

		edge1.subVectors(v2, v1);
		edge2.subVectors(v3, v1);
		cross.crossVectors(edge1, edge2);

		centroid.set(0, 0, 0).add(v1).add(v2).add(v3).multiplyScalar(ONE_THIRD);

		sum += centroid.dot(cross);
	}

	return Math.abs(sum) / 6;
};

export const calculateCadVolume = (cad: GLTF) => {
	let volume = 0;
	cad.scene.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			volume += calculateMeshVolume(child);
		}
	});
	return volume;
};
