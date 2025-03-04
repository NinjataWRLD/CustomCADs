import useDownloadProductCad from '@/hooks/queries/products/gallery/useDownloadProductCad.js';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl.js';
import { Product } from '../index.jsx';
import CreatorThreeJS from './threejs.jsx';
import styles from '../styles.module.css';

const CreatorCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cad } = useDownloadProductCad({ id: product.id });

	const cadBlobUrl = useGenerateBlobUrl(cad?.presignedUrl, cad?.contentType);
	if (!cadBlobUrl) return;

	return (
		<div className={styles.container}>
			<CreatorThreeJS url={cadBlobUrl} cam={cam} pan={pan} />
		</div>
	);
};

export default CreatorCad;
