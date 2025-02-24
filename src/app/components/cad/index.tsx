import { Coordinates } from '@/api/catalog/common.js';
import useEditorStore from '@/hooks/stores/useEditorStore.js';
import useDownloadProductCad from '@/hooks/queries/products/gallery/useDownloadProductCad.js';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl.js';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct.js';
import GalleryThreeJS from './threejs/gallery.jsx';
import CreatorThreeJS from './threejs/creator.jsx';
import styles from './styles.module.css';

interface CadProps {
	id: string;
	product?: {
		camCoordinates: Coordinates;
		panCoordinates: Coordinates;
	};
	type: 'gallery' | 'creator';
}

const Cad = ({ id, product, type }: CadProps) => {
	const { data: file } = useDownloadProductCad({ id: id });
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	useEditorStore(id);

	const shouldFetch = !product;
	const { data: fetchedProduct } = useGetProduct({ id: id }, shouldFetch);

	if (shouldFetch && !fetchedProduct) {
		return <></>;
	}
	const { camCoordinates: cam, panCoordinates: pan } =
		product ?? fetchedProduct!;

	let three = <></>;
	if (blobUrl) {
		switch (type) {
			case 'gallery':
				three = <GalleryThreeJS url={blobUrl} cam={cam} pan={pan} />;
				break;
			case 'creator':
				three = <CreatorThreeJS url={blobUrl} cam={cam} pan={pan} />;
				break;
			default:
				break;
		}
	}
	return <div className={styles.container}>{three}</div>;
};

export default Cad;
