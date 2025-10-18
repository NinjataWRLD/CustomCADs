import { useGetPurchasedCart } from '@/hooks/queries/purchased-carts';
import { useCadBlobUrl } from '@/hooks/useCadBlobUrl';
import { useGetCad } from '@/hooks/queries/cads';
import { getCadType } from '@/utils/get-cad-type';
import { useTextures } from '@/hooks/threejs/useTextures';
import Loader from '@/app/components/state/loading';
import CartThreeJS from './threejs';

type Customization = { materialId: number; color?: string };
type CartCadProps = { id: string; productId: string } & (
	| { forDelivery: true; customization: Customization }
	| { forDelivery: false }
);

const CartCad = (props: CartCadProps) => {
	const { data: cart } = useGetPurchasedCart({ id: props.id });
	const item = cart?.items.find((x) => x.productId === props.productId);

	const { data: cad } = useGetCad({ id: item?.cadId! }, !!item);
	const { blobUrl, progress } = useCadBlobUrl(item?.cadId, 'PurchasedCart');
	const textureBlobUrls = useTextures(props.forDelivery);

	const determineThreeJS = () => {
		if (!cad || !blobUrl) {
			return <Loader progress={progress} isCad />;
		}

		const file = {
			url: blobUrl,
			type: getCadType(cad.contentType),
		};
		if (!props.forDelivery) {
			return (
				<CartThreeJS
					file={file}
					cam={cad.camCoordinates}
					pan={cad.panCoordinates}
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
				cam={cad.camCoordinates}
				pan={cad.panCoordinates}
			/>
		);
	};

	return <div className='relative h-full w-full'>{determineThreeJS()}</div>;
};

export default CartCad;
