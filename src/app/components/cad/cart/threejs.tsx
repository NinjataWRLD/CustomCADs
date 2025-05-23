import * as THREE from 'three';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';

interface ThreeJSProps {
	customization?: { texture: string; color?: string };
	file: { url: string; type: string };
	cam: Coordinates;
	pan: Coordinates;
}

const CartThreeJS = ({ customization, file, cam, pan }: ThreeJSProps) => {
	const { ref } = useThreeJS(file.url, file.type, { cam, pan }, (cad) => {
		if (!customization) return;

		cad.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material = new THREE.MeshStandardMaterial({
					map: new THREE.TextureLoader().load(customization.texture),
					color: customization.color,
				});
			}
		});
	});
	return <div ref={ref} className='h-full w-full' />;
};

export default CartThreeJS;
