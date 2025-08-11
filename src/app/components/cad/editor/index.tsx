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
	const { data: cadInfo } = useDownloadProductCad({ id: id });
	const cad = useGenerateBlobUrl(cadInfo);

	const { data: product } = useGetProduct({ id: id });
	const { materialId, color, scale, size, infill } = useEditorStore(id);

	const textureBlobUrls = useTextures(true);
	if (!product || !cadInfo || !cad.blobUrl || !textureBlobUrls[materialId]) {
		return <Loader />;
	}
	const { camCoordinates: cam, panCoordinates: pan } = product;

	return (
		<div className='h-full w-full'>
			<EditorThreeJS
				file={{
					url: cad.blobUrl,
					type: getCadType(cadInfo.contentType),
				}}
				coords={{ cam, pan }}
				state={{
					color: color ?? undefined,
					texture: textureBlobUrls[materialId].blobUrl,
					volume: product.volume,
					density: textureBlobUrls[materialId].density,
					euroPerKg: textureBlobUrls[materialId].euroPerKg,
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
