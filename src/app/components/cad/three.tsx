import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Coordinates } from '@/api/catalog/common';
import styles from './styles.module.css';

interface ThreeJSProps {
	url: string;
	cam: Coordinates;
	pan: Coordinates;
}

const ThreeJS = ({ url, cam, pan }: ThreeJSProps) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const isTouchedRef = useRef(false);
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			90,
			window.innerWidth / window.innerHeight,
			0.001,
			1000,
		);
		camera.position.set(cam.x, cam.y, cam.z);

		const { x, y, z } = cam;
		if (!x && !y && !z) {
			camera.position.set(0, 0, 5);
		}

		const mount = mountRef.current;
		if (!mount || mount.children.length > 0) {
			return;
		}

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		mount.appendChild(renderer.domElement);

		const cadTouched = () => {
			if (!isTouchedRef.current) {
				window.dispatchEvent(new CustomEvent('PositionChanged'));
				isTouchedRef.current = true;
			}
		};

		const sendPosition = () => {
			const [camCoords, panCoords] = [camera.position, controls.target];
			window.dispatchEvent(
				new CustomEvent('SavePosition', {
					detail: { camCoords, panCoords },
				}),
			);
		};

		const resetPosition = () => {
			const [camCoords, panCoords] = [cam, pan];
			camera.position.set(camCoords.x, camCoords.y, camCoords.z);
			controls.target.set(panCoords.x, panCoords.y, panCoords.z);
			window.dispatchEvent(new CustomEvent('ResetsPosition'));
		};

		const trackChanges = () => {
			isTouchedRef.current = false;
		};

		const updateRendererSize = () => {
			const width = mount!.clientWidth;
			const height = mount!.clientHeight;

			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};
		updateRendererSize();

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;
		controls.target.set(pan.x, pan.y, pan.z);
		controls.update();

		const loader = new GLTFLoader();
		loader.load(
			url,
			(cad) => scene.add(cad.scene),
			(xhr) => xhr.loaded === xhr.total && setLoader(false),
		);

		controls.addEventListener('change', cadTouched);

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		controls.addEventListener('change', cadTouched);
		window.addEventListener('resize', updateRendererSize);
		window.addEventListener('TrackChanges', trackChanges);
		window.addEventListener('SendPosition', sendPosition);
		window.addEventListener('ResetPosition', resetPosition);

		return () => {
			mount.removeChild(renderer.domElement);
			controls.removeEventListener('change', cadTouched);
			window.removeEventListener('resize', updateRendererSize);
			window.removeEventListener('TrackChanges', trackChanges);
			window.removeEventListener('SendPosition', sendPosition);
			window.addEventListener('ResetPosition', resetPosition);
		};
	}, [loader, url]);

	return <div ref={mountRef} className={styles.model} />;
};

export default ThreeJS;
