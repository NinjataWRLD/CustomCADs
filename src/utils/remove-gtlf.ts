import * as THREE from 'three';

const removeGLTF = (scene: THREE.Scene) => {
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

export default removeGLTF;
