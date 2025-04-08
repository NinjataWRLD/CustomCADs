import { useEffect } from 'react';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import styles from '../styles.module.css';

interface ThreeJSProps {
	file: { url: string; type: string };
	cam: Coordinates;
	pan: Coordinates;
}

const CreatorThreeJS = ({ file, cam, pan }: ThreeJSProps) => {
	const { ref, instance } = useThreeJS(file.url, file.type, { cam, pan });

	useEffect(() => {
		instance?.updateCoords({ cam, pan });
	}, [cam, instance, pan]);

	return <div ref={ref} className={styles.model} />;
};

export default CreatorThreeJS;
