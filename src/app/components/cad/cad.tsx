import useDownloadProductCad from '@/hooks/queries/products/gallery/useDownloadProductCad.js';
import useBytesToBuffer from '@/hooks/useBytesToBuffer.js';
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

	const presignedUrl = file?.presignedUrl ?? '';
	const contentType = file?.contentType ?? '';

	const buffer = useBytesToBuffer(presignedUrl, contentType);
	const blobUrl = useGenerateBlobUrl(contentType, buffer);

	if (!buffer || buffer.byteLength === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<ThreeJS url={blobUrl} cam={cam} pan={pan} />
		</div>
	);
};

export default Cad;
