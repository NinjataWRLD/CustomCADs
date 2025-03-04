import {
	setCost,
	setRatio,
	setVolume,
	setWeight,
} from '@/stores/editor-store.js';
import useDownloadProductCad from '@/hooks/queries/products/gallery/useDownloadProductCad.js';
import useGenerateBlobUrl from '@/hooks/useGenerateBlobUrl.js';
import useEditorStore from '@/hooks/stores/useEditorStore.js';
import useGetProduct from '@/hooks/queries/products/gallery/useGetGalleryProduct.js';
import useTextures from '@/hooks/threejs/useTextures.js';
import EditorThreeJS from './threejs.jsx';
import styles from '../styles.module.css';

interface EditorCadProps {
	id: string;
}

const EditorCad = ({ id }: EditorCadProps) => {
	const { data: cad } = useDownloadProductCad({ id: id });
	const cadBlobUrl = useGenerateBlobUrl(cad?.presignedUrl, cad?.contentType);

	const { data: fetchedProduct } = useGetProduct({ id: id });
	const { materialId, color, scale, ratio, infill } = useEditorStore(id);

	const textureBlobUrls = useTextures();
	if (!fetchedProduct || !cadBlobUrl || !textureBlobUrls[materialId]) {
		return <></>;
	}
	const { camCoordinates: cam, panCoordinates: pan } = fetchedProduct;

	return (
		<div className={styles.container}>
			<EditorThreeJS
				url={cadBlobUrl}
				coords={{ cam, pan }}
				state={{
					color: color ?? undefined,
					texture: textureBlobUrls[materialId].blobUrl,
					density: textureBlobUrls[materialId].density,
					infill: infill / 100,
					scale: scale / 100,
					ratio: ratio,
				}}
				setState={{
					setRatio: (ratio) => setRatio(id, ratio),
					setVolume: (volume) => setVolume(id, volume),
					setWeight: (weight) => setWeight(id, weight),
					setCost: (cost) => setCost(id, cost),
				}}
			/>
		</div>
	);
};

export default EditorCad;
