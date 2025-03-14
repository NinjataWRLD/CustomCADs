import { Box3, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const lockGLTF = (cad: GLTF) => {
	const box = new Box3().setFromObject(cad.scene);
	const center = new Vector3();
	box.getCenter(center);
	cad.scene.position.sub(center);
};

export default lockGLTF;
