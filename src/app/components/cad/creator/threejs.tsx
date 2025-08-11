import { useEffect } from 'react';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import Model from '../model';

interface ThreeJSProps {
	file: { url: string; type: string };
	cam: Coordinates;
	pan: Coordinates;
}

const CreatorThreeJS = ({ file, cam, pan }: ThreeJSProps) => {
	const threejs = useThreeJS(file.url, file.type, { cam, pan });

	useEffect(() => {
		threejs.instance?.updateCoords({ cam, pan });
	}, [cam, threejs.instance, pan]);

	return <Model threejs={threejs} />;
};

export default CreatorThreeJS;
