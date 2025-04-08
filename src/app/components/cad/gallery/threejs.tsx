import { Coordinates } from '@/api/catalog/common';
import { useThreeJS } from '@/hooks/threejs/useThreeJS';
import styles from '../styles.module.css';

interface ThreeJSProps {
	file: { url: string; type: string };
	cam: Coordinates;
	pan: Coordinates;
}

const GalleryThreeJS = ({ file, cam, pan }: ThreeJSProps) => {
	const { ref } = useThreeJS(file.url, file.type, { cam, pan });
	return <div ref={ref} className={styles.model} />;
};

export default GalleryThreeJS;
