import { setCost, setSize, setWeight } from '@/stores/editor-store';
import { useCadBlobUrl } from '@/hooks/useCadBlobUrl';
import { useGetCad } from '@/hooks/queries/cads';
import { useEditorStore } from '@/hooks/stores/useEditorStore';
import { useGetProduct } from '@/hooks/queries/products/gallery';
import { useTextures } from '@/hooks/threejs/useTextures';
import Loader from '@/app/components/state/loading';
import { getCadType } from '@/utils/get-cad-type';
import EditorThreeJS from './threejs';

type EditorCadProps = {
	id: string;
};

const EditorCad = ({ id }: EditorCadProps) => {
	const { data: product } = useGetProduct({ id: id });
	const { materialId, color, scale, size, infill } = useEditorStore(id);

	const { data: cad } = useGetCad({ id: product?.cadId! }, !!product);
	const { blobUrl, progress } = useCadBlobUrl(product?.cadId!, 'Product');

	const textureBlobUrls = useTextures(true);
	if (!product || !cad || !blobUrl || !textureBlobUrls[materialId]) {
		return <Loader progress={progress} />;
	}

	return (
		<div className='h-full w-full'>
			<EditorThreeJS
				file={{
					url: blobUrl,
					type: getCadType(cad.contentType),
				}}
				coords={{ cam: cad.camCoordinates, pan: cad.panCoordinates }}
				state={{
					color: color ?? undefined,
					texture: textureBlobUrls[materialId].blobUrl,
					volume: cad.volume,
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
