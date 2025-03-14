import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Coordinates } from '@/api/catalog/common';
import removeGLTF from './remove-gtlf';

const init = {
	camera: (cam: Coordinates) => {
		const aspect = window.innerWidth / window.innerHeight;
		const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 10000);

		if (!cam.x && !cam.y && !cam.z) {
			camera.position.set(0, 0, 5);
		} else camera.position.set(cam.x, cam.y, cam.z);

		return camera;
	},
	renderer: (root: HTMLDivElement) => {
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		root.appendChild(renderer.domElement);

		return renderer;
	},
	lights: (scene: THREE.Scene) => {
		const ambientLight = new THREE.AmbientLight(0x808080);
		scene.add(ambientLight);

		const addDirectionalLight = (
			intensity: number,
			coords: { x: number; y: number; z: number },
		) => {
			const light = new THREE.DirectionalLight(0xffffff, intensity);
			light.position.set(coords.x, coords.y, coords.z);
			scene.add(light);
		};
		addDirectionalLight(1, { x: 5, y: 10, z: 5 });
		addDirectionalLight(0.5, { x: -5, y: 5, z: 5 });
		addDirectionalLight(0.5, { x: 5, y: -5, z: 5 });
		addDirectionalLight(0.3, { x: 0, y: 5, z: -5 });
		addDirectionalLight(0.3, { x: 0, y: -5, z: 0 });
		addDirectionalLight(0.3, { x: -5, y: 0, z: 0 });
		addDirectionalLight(0.3, { x: 5, y: 0, z: 0 });
	},
	controls: (camera: THREE.Camera, dom: HTMLCanvasElement) => {
		const controls = new OrbitControls(camera, dom);

		controls.enableDamping = true;
		controls.dampingFactor = 0.1;

		return controls;
	},
};

const animate = (
	controls: OrbitControls,
	renderer: THREE.WebGLRenderer,
	camera: THREE.PerspectiveCamera,
	scene: THREE.Scene,
) => {
	requestAnimationFrame(() => animate(controls, renderer, camera, scene));
	controls.update();
	renderer.render(scene, camera);
};

const update = {
	camera: (camera: THREE.Camera, cam: Coordinates) =>
		camera.position.set(cam.x, cam.y, cam.z),
	renderer: (
		renderer: THREE.WebGLRenderer,
		camera: THREE.PerspectiveCamera,
		root: HTMLDivElement,
	) => {
		const width = root.clientWidth;
		const height = root.clientHeight;

		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	},
	controls: (controls: OrbitControls, pan: Coordinates) => {
		controls.target.set(pan.x, pan.y, pan.z);
		controls.update();
	},
};

const initThreeJS = (
	root: HTMLDivElement | null,
	coords: { cam: Coordinates; pan: Coordinates },
) => {
	const scene = new THREE.Scene();

	const camera = init.camera(coords.cam);

	if (!root || root.children.length > 0) return;
	const renderer = init.renderer(root);
	const resizeHandler = () => update.renderer(renderer, camera, root);
	resizeHandler();

	const controls = init.controls(camera, renderer.domElement);
	update.controls(controls, coords.pan);

	init.lights(scene);
	animate(controls, renderer, camera, scene);

	const updateCoords = (coords: { cam: Coordinates; pan: Coordinates }) => {
		update.camera(camera, coords.cam);
		update.controls(controls, coords.pan);
	};

	window.addEventListener('resize', resizeHandler);
	const exit = () => {
		window.removeEventListener('resize', resizeHandler);

		controls.dispose();
		renderer.dispose();
		renderer.domElement.remove();

		removeGLTF(scene);
		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
	};

	return { scene, camera, renderer, controls, updateCoords, exit };
};

export default initThreeJS;
