import { useDownloadPurchasedCartItemCad } from '@/hooks/queries/purchased-carts';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { getCadType } from '@/utils/get-cad-type';
import CartThreeJS from './threejs';
import { useTextures } from '@/hooks/threejs/useTextures';

interface CartCadProps {
	id: string;
	productId: string;
	customization?: {
		materialId: number;
		color?: string;
	};
}
const CartCad = ({ id, productId, customization }: CartCadProps) => {
	const { data: cad } = useDownloadPurchasedCartItemCad({ id, productId });
	const cadBlobUrl = useGenerateBlobUrl(cad);

	const textureBlobUrls = useTextures();
	if (!cad || !cadBlobUrl || !customization) return;

	return (
		<div className='h-full w-full'>
			<CartThreeJS
				customization={{
					texture: textureBlobUrls[customization.materialId].blobUrl,
					color: customization.color,
				}}
				file={{ url: cadBlobUrl, type: getCadType(cad.contentType) }}
				cam={cad.camCoordinates}
				pan={cad.panCoordinates}
			/>
		</div>
	);
};

export default CartCad;
