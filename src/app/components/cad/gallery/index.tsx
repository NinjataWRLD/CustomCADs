import { Response as Product } from '@/api/catalog/products/gallery/single';
import { useCadBlobUrl } from '@/hooks/useCadBlobUrl';
import { useGetCad } from '@/hooks/queries/cads';
import { getCadType } from '@/utils/get-cad-type';
import GalleryThreeJS from './threejs';
import Loader from '@/app/components/state/loading';

const GalleryCad = ({ product }: { product: Product }) => {
	const { data: cad } = useGetCad({ id: product.cadId });
	const { blobUrl, progress } = useCadBlobUrl(product.cadId, 'Product');

	return (
		<div className='relative h-full w-full'>
			{!cad || !blobUrl ? (
				<Loader progress={progress} />
			) : (
				<GalleryThreeJS
					file={{
						url: blobUrl,
						type: getCadType(cad.contentType),
					}}
					cam={cad.camCoordinates}
					pan={cad.panCoordinates}
				/>
			)}
		</div>
	);
};

export default GalleryCad;
