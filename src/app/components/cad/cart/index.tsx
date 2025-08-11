import { useDownloadPurchasedCartItemCad } from '@/hooks/queries/purchased-carts';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { getCadType } from '@/utils/get-cad-type';
import CartThreeJS from './threejs';
import { useTextures } from '@/hooks/threejs/useTextures';
import Loader from '@/app/components/state/loading';

interface CartCadProps {
	id: string;
	productId: string;
	customization?: {
		materialId: number;
		color?: string;
	};
	forDelivery: boolean;
}
const CartCad = ({
	id,
	productId,
	customization,
	forDelivery,
}: CartCadProps) => {
	const { data: cadInfo } = useDownloadPurchasedCartItemCad({
		id,
		productId,
	});
	const cad = useGenerateBlobUrl(cadInfo);

	const textureBlobUrls = useTextures(forDelivery);

	let threeJsCustomization;
	if (customization)
		threeJsCustomization = {
			texture: textureBlobUrls[customization.materialId]?.blobUrl,
			color: customization.color,
		};

	return (
		<div className='relative h-full w-full'>
			{!cadInfo || !cad.blobUrl ? (
				<Loader progress={cad.progress} />
			) : (
				<CartThreeJS
					customization={threeJsCustomization}
					file={{
						url: cad.blobUrl,
						type: getCadType(cadInfo.contentType),
					}}
					cam={cadInfo.camCoordinates}
					pan={cadInfo.panCoordinates}
				/>
			)}
		</div>
	);
};

export default CartCad;
