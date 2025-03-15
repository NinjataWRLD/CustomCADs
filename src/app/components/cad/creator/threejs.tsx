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
		if (!instance) return;
		const { updateCoords } = instance;
		updateCoords({ cam, pan });
	}, [cam, pan]);

	return <div ref={ref} className={styles.model} />;
};

export default CreatorThreeJS;
