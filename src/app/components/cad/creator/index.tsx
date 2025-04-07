import { useDownloadProductCad } from '@/hooks/queries/products/gallery';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { Product } from '../index';
import CreatorThreeJS from './threejs';
import styles from '../styles.module.css';

const CreatorCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cad } = useDownloadProductCad({ id: product.id });

	const cadBlobUrl = useGenerateBlobUrl(cad);
	if (!cadBlobUrl) return;

	return (
		<div className={styles.container}>
			<CreatorThreeJS url={cadBlobUrl} cam={cam} pan={pan} />
		</div>
	);
};

export default CreatorCad;
