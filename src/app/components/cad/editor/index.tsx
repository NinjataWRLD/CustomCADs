import { setCost, setSize, setWeight } from '@/stores/editor-store.js';
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

	const { data: product } = useGetProduct({ id: id });
	const { materialId, color, scale, size, infill } = useEditorStore(id);

	const textureBlobUrls = useTextures();
	if (!product || !cadBlobUrl || !textureBlobUrls[materialId]) {
		return <></>;
	}
	const { camCoordinates: cam, panCoordinates: pan } = product;

	return (
		<div className={styles.container}>
			<EditorThreeJS
				url={cadBlobUrl}
				coords={{ cam, pan }}
				state={{
					color: color ?? undefined,
					texture: textureBlobUrls[materialId].blobUrl,
					volume: product.volume,
					density: textureBlobUrls[materialId].density,
					infill: infill / 100,
					scale: scale / 100,
					size: size,
				}}
				setState={{
					setSize: (size) => setSize(id, size),
					setWeight: (weight) => setWeight(id, weight),
					setCost: (cost) => setCost(id, cost),
				}}
			/>
		</div>
	);
};

export default EditorCad;
