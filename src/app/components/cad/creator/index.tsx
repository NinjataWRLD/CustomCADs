import { Response as Product } from '@/api/catalog/products/gallery/single';
import { useDownloadProductCad } from '@/hooks/queries/products/gallery';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { getCadType } from '@/utils/get-cad-type';
import CreatorThreeJS from './threejs';
import Loader from '@/app/components/state/loading';

const CreatorCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cadInfo } = useDownloadProductCad({ id: product.id });

	const cad = useGenerateBlobUrl(cadInfo);
	if (!cadInfo || !cad.blobUrl) return <Loader progress={cad.progress} />;

	return (
		<div className='h-full w-full'>
			<CreatorThreeJS
				file={{
					url: cad.blobUrl,
					type: getCadType(cadInfo.contentType),
				}}
				cam={cam}
				pan={pan}
			/>
		</div>
	);
};

export default CreatorCad;
