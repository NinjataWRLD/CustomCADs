import { Material } from '@/types/threejs';
import absPic from '@/assets/textures/abs.webp';
import glowInDarkPic from '@/assets/textures/glow-in-dark.webp';
import plaPic from '@/assets/textures/pla.webp';
import tufPic from '@/assets/textures/tuf.webp';
import woodPic from '@/assets/textures/wood.webp';

const getTextureByMaterial = (material: Material) => {
	const textureImages: Record<Material, string> = {
		ABS: absPic,
		'Glow in dark': glowInDarkPic,
		PLA: plaPic,
		TUF: tufPic,
		Wood: woodPic,
	};

	return textureImages[material];
};

export default getTextureByMaterial;
