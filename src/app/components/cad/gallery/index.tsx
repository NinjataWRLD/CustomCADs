import { Response as Product } from '@/api/catalog/products/gallery/single';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { useDownloadProductCad } from '@/hooks/queries/products/gallery';
import { getCadType } from '@/utils/get-cad-type';
import GalleryThreeJS from './threejs';
import Loader from '@/app/components/state/loading';

const GalleryCad = ({ product }: { product: Product }) => {
	const { camCoordinates: cam, panCoordinates: pan } = product;
	const { data: cadInfo } = useDownloadProductCad({ id: product.id });

	const cad = useGenerateBlobUrl(cadInfo);

	return (
		<div className='relative h-full w-full'>
			{!cadInfo || !cad.blobUrl ? (
				<Loader progress={cad.progress} isCad />
			) : (
				<GalleryThreeJS
					file={{
						url: cad.blobUrl,
						type: getCadType(cadInfo.contentType),
					}}
					cam={cam}
					pan={pan}
				/>
			)}
		</div>
	);
};

export default GalleryCad;
