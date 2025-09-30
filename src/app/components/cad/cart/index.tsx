import { useDownloadPurchasedCartItemCad } from '@/hooks/queries/purchased-carts';
import { useGenerateBlobUrl } from '@/hooks/useGenerateBlobUrl';
import { getCadType } from '@/utils/get-cad-type';
import CartThreeJS from './threejs';
import { useTextures } from '@/hooks/threejs/useTextures';
import Loader from '@/app/components/state/loading';

type Customization = { materialId: number; color?: string };
type CartCadProps = { id: string; productId: string } & (
	| { forDelivery: true; customization: Customization }
	| { forDelivery: false }
);

const CartCad = (props: CartCadProps) => {
	const { data: cadInfo } = useDownloadPurchasedCartItemCad(props);
	const cad = useGenerateBlobUrl(cadInfo);
	const textureBlobUrls = useTextures(props.forDelivery);

	const determineThreeJS = () => {
		if (!cadInfo || !cad.blobUrl) {
			return <Loader progress={cad.progress} isCad />;
		}

		const file = {
			url: cad.blobUrl,
			type: getCadType(cadInfo.contentType),
		};
		if (!props.forDelivery) {
			return (
				<CartThreeJS
					file={file}
					cam={cadInfo.camCoordinates}
					pan={cadInfo.panCoordinates}
				/>
			);
		}

		const customization = {
			texture: textureBlobUrls[props.customization.materialId]?.blobUrl,
			color: props.customization.color,
		};
		return (
			<CartThreeJS
				customization={customization}
				file={file}
				cam={cadInfo.camCoordinates}
				pan={cadInfo.panCoordinates}
			/>
		);
	};

	return <div className='relative h-full w-full'>{determineThreeJS()}</div>;
};

export default CartCad;
