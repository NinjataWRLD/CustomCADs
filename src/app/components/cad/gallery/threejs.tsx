import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import Model from '../model';

type ThreeJSProps = {
	file: { url: string; type: string };
	cam: Coordinates;
	pan: Coordinates;
};

const GalleryThreeJS = ({ file, cam, pan }: ThreeJSProps) => {
	const threejs = useThreeJS(file.url, file.type, { cam, pan });
	return <Model threejs={threejs} />;
};

export default GalleryThreeJS;
