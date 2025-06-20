import { setCost, setSize, setWeight } from '@/stores/editor-store';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import {
	useGetProduct,
	useDownloadProductCad,
} from '@/hooks/queries/products/gallery';
import { useTextures } from '@/hooks/threejs/useTextures';
import Loader from '@/app/components/state/loading';
import { getCadType } from '@/utils/get-cad-type';
import EditorThreeJS from './threejs';

interface EditorCadProps {
	id: string;
}

const EditorCad = ({ id }: EditorCadProps) => {
	const { data: cad } = useDownloadProductCad({ id: id });
	const cadBlobUrl = useGenerateBlobUrl(cad);

	const { data: product } = useGetProduct({ id: id });
	const { materialId, color, scale, size, infill } = useEditorStore(id);

	const textureBlobUrls = useTextures(true);
	if (!product || !cad || !cadBlobUrl || !textureBlobUrls[materialId]) {
		return <Loader />;
	}
	const { camCoordinates: cam, panCoordinates: pan } = product;

	return (
		<div className='h-full w-full'>
			<EditorThreeJS
				file={{ url: cadBlobUrl, type: getCadType(cad.contentType) }}
				coords={{ cam, pan }}
				state={{
					color: color ?? undefined,
					texture: textureBlobUrls[materialId].blobUrl,
					volume: product.volume,
					density: textureBlobUrls[materialId].density,
					infill: infill,
					scale: scale,
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
