import { Coordinates } from '@/api/catalog/common';
import useThreeJS from '@/hooks/threejs/useThreeJS';
import styles from './styles.module.css';

interface ThreeJSProps {
	url: string;
	cam: Coordinates;
	pan: Coordinates;
}

const GalleryThreeJS = ({ url, cam, pan }: ThreeJSProps) => {
	const { ref } = useThreeJS(url, { cam, pan });
	return <div ref={ref} className={styles.model} />;
};

export default GalleryThreeJS;
