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
	const { data: cad } = useDownloadPurchasedCartItemCad({ id, productId });
	const cadBlobUrl = useGenerateBlobUrl(cad);

	const textureBlobUrls = useTextures(forDelivery);
	if (!cad || !cadBlobUrl) return <Loader />;

	let threeJsCustomization;
	if (customization)
		threeJsCustomization = {
			texture: textureBlobUrls[customization.materialId]?.blobUrl,
			color: customization.color,
		};

	return (
		<div className='h-full w-full'>
			<CartThreeJS
				customization={threeJsCustomization}
				file={{ url: cadBlobUrl, type: getCadType(cad.contentType) }}
				cam={cad.camCoordinates}
				pan={cad.panCoordinates}
			/>
		</div>
	);
};

export default CartCad;
