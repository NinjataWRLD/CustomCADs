import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useDownloadProductCad } from '@/hooks/queries/products/gallery';
import GalleryThreeJS from './threejs';
import { Product } from '../index';
import styles from '../styles.module.css';

const GalleryCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cad } = useDownloadProductCad({ id: product.id });

	const cadBlobUrl = useGenerateBlobUrl(cad?.presignedUrl, cad?.contentType);
	if (!cadBlobUrl) return;

	return (
		<div className={styles.container}>
			<GalleryThreeJS url={cadBlobUrl} cam={cam} pan={pan} />
		</div>
	);
};

export default GalleryCad;
