import { setCost, setSize, setWeight } from '@/stores/editor-store';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import {
	useGetProduct,
	useDownloadProductCad,
} from '@/hooks/queries/products/gallery';
import { useTextures } from '@/hooks/threejs/useTextures';
import EditorThreeJS from './threejs';
import styles from '../styles.module.css';

interface EditorCadProps {
	id: string;
}

const EditorCad = ({ id }: EditorCadProps) => {
	const { data: cad } = useDownloadProductCad({ id: id });
	const cadBlobUrl = useGenerateBlobUrl(cad);

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
