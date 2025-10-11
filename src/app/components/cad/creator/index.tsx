import { Response as Product } from '@/api/catalog/products/gallery/single';
import { useCadBlobUrl } from '@/hooks/useCadBlobUrl';
import { useGetCad } from '@/hooks/queries/cads';
import { getCadType } from '@/utils/get-cad-type';
import Loader from '@/app/components/state/loading';
import CreatorThreeJS from './threejs';

const CreatorCad = ({ product }: { product: Product }) => {
	const { data: cad } = useGetCad({ id: product.cadId });
	const { blobUrl, progress } = useCadBlobUrl(product.cadId, 'Product');

	if (!cad || !blobUrl) return <Loader progress={progress} isCad />;

	return (
		<div className='h-full w-full'>
			<CreatorThreeJS
				file={{
					url: blobUrl,
					type: getCadType(cad.contentType),
				}}
				cam={cad.camCoordinates}
				pan={cad.panCoordinates}
			/>
		</div>
	);
};

export default CreatorCad;
