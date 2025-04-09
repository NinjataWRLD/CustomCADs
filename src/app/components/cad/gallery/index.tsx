import { Response as Product } from '@/api/catalog/products/gallery/single';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useDownloadProductCad } from '@/hooks/queries/products/gallery';
import { getCadType } from '@/utils/get-cad-type';
import GalleryThreeJS from './threejs';
import styles from '../styles.module.css';

const GalleryCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cad } = useDownloadProductCad({ id: product.id });

	const cadBlobUrl = useGenerateBlobUrl(cad);
	if (!cad || !cadBlobUrl) return;

	return (
		<div className={styles.container}>
			<GalleryThreeJS
				file={{ url: cadBlobUrl, type: getCadType(cad.contentType) }}
				cam={cam}
				pan={pan}
			/>
		</div>
	);
};

export default GalleryCad;
