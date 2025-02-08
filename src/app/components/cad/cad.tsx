import useDownloadProductCad from '@/hooks/queries/products/gallery/useDownloadProductCad.js';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl.js';
import { Coordinates } from '@/api/catalog/common.js';
import ThreeJS from './three.js';
import styles from './cad.module.css';

interface CadProps {
	id: string;
	cam: Coordinates;
	pan: Coordinates;
}

const Cad = ({ id, cam, pan }: CadProps) => {
	const { data: file } = useDownloadProductCad({ id: id });
	const blobUrl = useGenerateBlobUrl(file?.presignedUrl, file?.contentType);

	return (
		<div className={styles.container}>
			<ThreeJS url={blobUrl} cam={cam} pan={pan} />
		</div>
	);
};

export default Cad;
