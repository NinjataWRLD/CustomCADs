import { Group, Mesh, MeshStandardMaterial, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { lockCad } from '@/utils/cad';
import { Cad } from '@/types/threejs';

export const gltf = (
	scene: Scene,
	url: string,
	callback?: (cad: Cad) => void,
) => {
	new GLTFLoader().load(url, (cad) => {
		lockCad(cad.scene);
		if (callback) callback(cad.scene);
		scene.add(cad.scene);
	});
};

export const stl = (
	scene: Scene,
	url: string,
	callback?: (cad: Cad) => void,
) => {
	new STLLoader().load(url, (cad) => {
		const group = new Group();
		cad.center();
		group.add(new Mesh(cad, new MeshStandardMaterial({ color: 0xaaaaaa })));

		lockCad(group);
		if (callback) callback(group);
		scene.add(group);
	});
};
