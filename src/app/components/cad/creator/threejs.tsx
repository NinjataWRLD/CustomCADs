import { useEffect } from 'react';
import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import styles from '../styles.module.css';

interface ThreeJSProps {
	url: string;
	cam: Coordinates;
	pan: Coordinates;
}

const CreatorThreeJS = ({ url, cam, pan }: ThreeJSProps) => {
	const { ref, instance } = useThreeJS(url, { cam, pan });

	useEffect(() => {
		instance?.updateCoords({ cam, pan });
	}, [cam, instance, pan]);

	return <div ref={ref} className={styles.model} />;
};

export default CreatorThreeJS;
